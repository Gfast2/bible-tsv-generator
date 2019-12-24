import chalk from 'chalk';
import write2fs from './write2fs';
import zhHans from './zh_hans';
import fetchBooks from './fetchBooks';
import { BookVersion, BookNameArr, BookVersionBodyProcessed, BookGenerateResult } from '../types/globals';

const writeTsv = async (obj: BookVersionBodyProcessed, _bookNamePairs: BookNameArr, _bookVersion: BookVersion): Promise<string> => {
  const titleType = _bookVersion === 'cns' || _bookVersion === 'cus' ? 'simplified' : 'traditional';
  for await (const [bookId, objBody] of Object.entries<object>(obj)) {
    const nameObj = _bookNamePairs[bookId];
    const zhFullName = titleType === 'simplified' ? nameObj['zhHansFull'] : nameObj['zhHantFull'];
    const zhShortName = titleType === 'simplified' ? nameObj['zhHansShort'] : nameObj['zhHantShort'];
    console.log(chalk.bold.dim('Writing down book ') + chalk.inverse.whiteBright(zhFullName));
    for await (const [key, value] of Object.entries(objBody)) {
      if (key === 'book') {
        for await (const [k, verses] of Object.entries<object>(value)) {
          const chapterID = k;
          for await (const [verseID, verseContent] of Object.entries(verses)) {
            const line = `${zhFullName}\t${zhShortName}\t${bookId}\t${chapterID}\t${verseID}\t${verseContent}\n`;
            await write2fs(line, _bookVersion);
          }
        }
      }
    }
  }
  return 'succeed';
};

export default async (bookVersion: BookVersion): Promise<BookGenerateResult> => {
  try {
    const bookNamePairs = await zhHans();
    const bookObj = await fetchBooks(bookVersion);
    const wholeBible = bookObj.version;
    const clearExistContent = true;
    await write2fs('', bookVersion, clearExistContent); // Clear old contents
    await writeTsv(wholeBible, bookNamePairs, bookVersion);
    return BookGenerateResult.succeed;
  } catch (e) {
    console.log(chalk.bold.underline.redBright('Got Problem when generating books. Error Message:\n' + e));
    return BookGenerateResult.failed;
  }
};
// Format in .tsv file:
// <Fullname>\t<Shortname>\t<Book ID>\t<Chapter ID>\t<verse ID>\t<verse content>\n
