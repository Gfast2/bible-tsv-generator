// Fetch the actual books and return content as json object
// const bookUrl = 'https://getbible.net/index.php?view=json&v=cns'; // 'cus' for traditional chinese!
const bookUrl = 'https://getbible.net/index.php?view=json&v='; // 'cus' for traditional chinese!
// const bookUrl = 'http://192.168.0.92/cns.html'; // for simulation purpose
import axios, { AxiosResponse } from 'axios';
import { BookVersion } from '../types/globals';

// Parse each book's content back to humanreadable format.
const decodeEachBook = (book: any): object => {
  const book2Return: any = {};
  Object.entries<object[]>(book).map(([key, value]) => {
    const transChapter: any = {};
    Object.entries<object>(value).map(([k, v]) => {
      if (k === 'chapter') {
        Object.entries(v).map(([nam, sentenceObj]) => {
          // TODO: Update the regex for removing whitespaces between two chinese characters
          transChapter[nam] = decodeURI(sentenceObj.verse).replace(/\r\n/, '');
        });
      }
    });
    book2Return[key] = transChapter;
  });
  return book2Return;
};

// Parse all books' content
const decodeAllBooks = (books: { [s: string]: object[] }): object => {
  const newVersion: { [s: string]: { [i: string]: string | object } } = {};
  Object.entries<object[]>(books).map(([key, object]) => {
    newVersion[key] = {};
    Object.entries(object).map(([k, o]) => {
      newVersion[key][k] = k === 'book' ? decodeEachBook(o) : o;
    });
  });
  return newVersion;
};

// TDOO: I do need here too, some way to define the return type for resolve as object, and reject for string
// TODO: Ask Leo how to dealing with some let declaration for variable in this situation
export default async (bookVersion: BookVersion)/*: Promise<object | string>*/ =>
  await axios.get(encodeURI(`${bookUrl}${bookVersion}`)).then(
    (resolved: AxiosResponse<string>) => {
      if (resolved.status !== 200 || resolved.statusText !== 'OK') {
        return Promise.reject('Failed to parse response books');
      }
      const raw = resolved.data;
      const tmp = raw.substring(1, raw.length - 2);
      // let rawBook: { version: object } = { version: {} };
      let rawBook: any = {};
      try {
        rawBook = JSON.parse(tmp);
      } catch (error) {
        return Promise.reject('Failed to convert books to json');
      }
      const { version, ...otherRawBookProperty } = rawBook;
      const parsedBooks = decodeAllBooks(version);
      const theBible = {
        ...otherRawBookProperty,
        version: parsedBooks,
      };
      return Promise.resolve(theBible);
    },
    (rejected: AxiosResponse<string>) => {
      // return Promise.reject(rejected);
      return rejected;
    }
  );
// Whole response Body (depth=0)
// {
//   "type": "version",
//   "version_ref": "cus",
//   "direction": "LTR",
//   "version": "[Version Object Body]"
// }
// Version Object (Whole Bible JSON) (depth=1):
// {
//   ...
//   "'63'": {
//     "version": "cus",
//     "book_name": "2 John",
//     "book_nr": 63,
//     "direction": "LTR",
//     "book": "[Book Object Body]"
//   }
//   ...
// }
// Book Object (Each Book Json) (depth=2):
// {
//   "1":{
//     "chapter_nr": 1,
//     "chapter":{
//       "1": {
//               "verse_nr":"1",
//               "verse:"起初， 神創造天地。"
//             },
//       "2":...
//     },
//     ...
//   },
//   ...
// }
