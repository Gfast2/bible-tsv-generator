/***
 * Define the avaialable book versions
 * @typeparam 'cns' Chinese NCV Simplified
 * @typeparam 'cnt' Chinese NCV Traditional
 * @typeparam 'cus' Chinese Union Simplified
 * @typeparam 'cut';Chinese Union Traditional
 * */
export type BookVersion =
  | 'cns' // Chinese: NCV Simplified
  | 'cnt' // Chinese: NCV Traditional
  | 'cus' // Chinese: Union Simplified
  | 'cut'; // Chinese: Union Traditional

export interface BookNameObject {
  [s: string]: string;
  enFull: string;
  enShort: string;
  enShorter: string;
  zhHantFull: string;
  zhHantShort: string;
  zhHansFull: string;
  zhHansShort: string;
}

export interface BookNameArr {
  [name: string]: BookNameObject;
}

// START: fetchBooks.ts use these interfaces for parsing these object
export interface BookSingleReturned {
  [s: string]: { [s: string]: string };
}

export interface BookChapterVerses {
  [s: string]: string;
  verse_nr: string;
  verse: string;
}

export interface BookChapterObject {
  [s: string]: number | BookChapterVerses;
  chapter_nr: number;
  chapter: BookChapterVerses;
}

export interface BookSingleBook {
  [s: string]: BookChapterObject;
}

export interface BookContentObjectProcessed {
  [s: string]: string | number | BookSingleReturned;
  version: string;
  book_name: string;
  book_nr: number;
  direction: string;
  book: BookSingleReturned;
}

export interface BookContentObject {
  version: string;
  book_name: string;
  book_nr: number;
  direction: string;
  book: BookSingleBook;
}

export interface BookVersionBodyProcessed {
  [s: string]: BookContentObjectProcessed;
}

export interface BookVersionBody {
  [s: string]: BookContentObject;
}

export interface BookVersionMainProcessed {
  [s: string]: string | BookVersionBodyProcessed;
  type: string;
  version_ref: string;
  direction: string;
  version: BookVersionBodyProcessed;
}

export interface BookVersionMain {
  [s: string]: string | BookVersionBody;
  type: string;
  version_ref: string;
  direction: string;
  version: BookVersionBody;
}
// END: fetchBooks.ts use these interfaces for parsing these object
export const enum BookGenerateResult {
  succeed,
  failed,
}
