import chalk from 'chalk';
import write2fs from './write2fs';
import zhHans from './zh_hans';
import fetchBooks from './fetchBooks';
import { BookVersion } from '../types/globals';
// import { doneGraph } from './asciiGraph';

const writeTsv = async (obj: any, _bookNamePairs: any, _bookVersion: BookVersion): Promise<string | undefined> => {
  for await (const [bookId, objBody] of Object.entries<object>(obj)) {
    const nameObj = _bookNamePairs[bookId];
    const zhFullName = nameObj['zhHansFull'];
    const zhShortName = nameObj['zhHansShort'];
    console.log(chalk.bold.dim('Writing down book ') + chalk.inverse.whiteBright(zhFullName));
    for await (const [key, value] of Object.entries(objBody)) {
      if (key === 'book') {
        for await (const [k, verses] of Object.entries<object>(value)) {
          const chapterID = k;
          for await (const [verseID, verseContent] of Object.entries(verses)) {
            const line = `${zhFullName}\t${zhShortName}\t${bookId}\t${chapterID}\t${verseID}\t${verseContent}\n`;
            try {
              await write2fs(line, _bookVersion);
            } catch (error) {
              return error;
            }
          }
        }
      }
    }
  }
};

export default (bookVersion: BookVersion): Promise<string | undefined> =>
  zhHans()
    .then((res: any) => {
      console.log('Got all simplified chinese book titles.');
      const bookNamePairs = res;
      return bookNamePairs;
    })
    .catch((rej: any) => {
      console.log(chalk.bold.underline.redBright('Got rejected while fetching book titles.'));
      console.log(rej);
      return 'fail';
    })
    .then(
      // TODO: The first Project to get name can still fail, handle it in this then()
      async (_bookNamePairs: any): Promise<string | undefined> => {
        let wholeBible: any = {};
        try {
          const bookObj = await fetchBooks(bookVersion);
          wholeBible = bookObj.version;
        } catch (e) {
          console.log('Failed to fetch book content.');
          return Promise.reject('fail');
        }
        console.log('Got all simplified chinese book contents.');
        const clearExistContent = true;
        try {
          await write2fs('', bookVersion, clearExistContent);
        } catch (e) {
          console.log('Failed to clear target file.');
          return Promise.reject('fail');
        }
        try {
          await writeTsv(wholeBible, _bookNamePairs, bookVersion);
          return Promise.reject('succeed');
        } catch (e) {
          console.log('Failed to write content into target file.');
          return Promise.reject('fail');
        }
      }
    );
/* 
export default async (bookVersion: BookVersion) =>
  zhHans().then(
    (resolved: any) => {
      console.log('Got all simplified chinese book titles.');
      fetchBooks(bookVersion).then(
        async (resol: any) => {
          console.log('Got all simplified chinese book contents.');
          const wholeBible = resol.version;
          const bookNamePairs = resolved;
          const clearExistContent = true;
          await write2fs('', bookVersion, clearExistContent);
          await writeTsv(wholeBible, bookNamePairs, bookVersion).then(
            () => {
              doneGraph();
              console.log(
                chalk.bold.green(
                  `All done properly!
                  The simplified chinese bible can be found in repo root directory with name: `
                ) + chalk.inverse.underline.yellowBright(`"${bookVersion}.tsv"`)
              );
            },
            () => {
              console.log(chalk.bold.underline.redBright('Failed to write down bible after fetch it from internet correctly.'));
            }
          );
        },
        (rejec: any) => {
          console.log(chalk.bold.underline.redBright('Failed to fetch & parse whole bible with following reason:'));
          console.log(rejec);
        }
      );
    },
    (reason: any) => {
      console.log(chalk.bold.underline.redBright('Got rejected while fetching book titles.'));
      console.log(reason);
    }
  ); */

// Format in .tsv file:
// <Fullname>\t<Shortname>\t<Book ID>\t<Chapter ID>\t<verse ID>\t<verse content>\n
