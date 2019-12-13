// Fetch the actual books and return content as json object
const bookUrl = 'https://getbible.net/index.php?view=json&v=cns'; // 'cus' for traditional chinese!
import axios from 'axios';
import { BookVersion } from '../types/globals';

// Parse each book's content back to humanreadable format.
const decodeEachBook = (book: any): object => {
  const book2Return: any = {};
  Object.entries<object[]>(book).map(([key, value]) => {
    const transChapter: any = {};
    Object.entries<object>(value).map(([k, v]) => {
      if (k === 'chapter') {
        Object.entries(v).map(([nam, sentenceObj]) => {
          transChapter[nam] = decodeURI(sentenceObj.verse).replace(/\r\n/, '');
        });
      }
    });
    book2Return[key] = transChapter;
  });
  return book2Return;
};

// Parse all books' content
const decodeAllBooks = (books: any): object => {
  const newVersion: any = {};
  Object.entries<object[]>(books).map(([key, object]) => {
    newVersion[key] = {};
    Object.entries(object).map(([k, o]) => {
      newVersion[key][k] = k === 'book' ? decodeEachBook(o) : o;
    });
  });
  return newVersion;
};

// TODO: Here I define four different book name for different chinese bible versions
export default async (bookVersion: BookVersion) =>
  await axios.get(bookUrl).then(
    (resolved: any) => {
      if (resolved.status !== 200 || resolved.statusText !== 'OK') {
        return Promise.reject('Failed to parse response books');
      }
      const raw = resolved.data;
      const tmp = raw.substring(1, raw.length - 2);
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
    (rejected: any) => {
      return Promise.reject(rejected);
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
