// Fetch the actual books and return content as json object
// const bookUrl = 'https://getbible.net/index.php?view=json&v=cns'; // 'cus' for traditional chinese!
const bookUrl = 'https://getbible.net/index.php?view=json&v='; // 'cus' for traditional chinese!
// const bookUrl = 'http://192.168.0.92/cns.html'; // for simulation purpose
import axios, { AxiosResponse } from 'axios';
import {
  BookVersion,
  BookVersionMainProcessed,
  BookVersionMain,
  BookVersionBody,
  BookContentObject,
  BookChapterObject,
  BookSingleBook,
  BookChapterVerses,
  BookVersionBodyProcessed,
  BookContentObjectProcessed,
  BookSingleReturned,
} from '../types/globals';

// Parse each book's content back to humanreadable format.
const decodeEachBook = (book: BookSingleBook): BookSingleReturned => {
  const book2Return: BookSingleReturned = {} as BookSingleReturned;
  Object.entries<BookChapterObject>(book).map(([key, value]) => {
    const transChapter: BookChapterVerses = {} as BookChapterVerses;
    Object.entries<number | BookChapterVerses>(value).map(([k, v]) => {
      if (k === 'chapter') {
        Object.entries(v).map(([nam, sentenceObj]) => {
          transChapter[nam] = decodeURI(sentenceObj.verse)
            .replace(/\r\n/, '')
            .replace(/\s/g, '') // found "cut" and "cus" version has interesting whitespace between each chinese character
            .replace(/神/g, ' 神');
        });
      }
    });
    book2Return[key] = transChapter;
  });
  return book2Return;
};

// Parse all books' content
const decodeAllBooks = (books: BookVersionBody): BookVersionBodyProcessed => {
  const newVersion: BookVersionBodyProcessed = {} as BookVersionBodyProcessed;
  Object.entries<BookContentObject>(books).map(([key, object]) => {
    newVersion[key] = {} as BookContentObjectProcessed;
    Object.entries(object).map(([k, o]) => {
      newVersion[key][k] = k === 'book' ? decodeEachBook(o) : o;
    });
  });
  return newVersion;
};

export default (bookVersion: BookVersion): Promise<BookVersionMainProcessed> =>
  axios.get(encodeURI(`${bookUrl}${bookVersion}`)).then(
    (resolved: AxiosResponse<string>) => {
      if (resolved.status !== 200 || resolved.statusText !== 'OK') {
        throw 'Failed to parse response books';
      }
      const raw = resolved.data;
      const tmp = raw.substring(1, raw.length - 2);
      let rawBook: BookVersionMain = {} as BookVersionMain;
      try {
        rawBook = JSON.parse(tmp);
      } catch (error) {
        throw 'Failed to convert books to json';
      }
      // TODO: when "version" is not posted by API, it will be "undefined"
      const { version, ...otherRawBookProperty } = rawBook;
      const parsedBooks = decodeAllBooks(version);
      const theBible = {
        ...otherRawBookProperty,
        version: parsedBooks,
      };
      return theBible;
    },
    (rejected: AxiosResponse<string>) => {
      throw rejected;
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

/** "BookSingleReturned"
{
  "1": {
    "1":"起初， 神創造天地。"
    ...
  }
  ...
}
 */
