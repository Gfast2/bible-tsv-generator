import zhHans from './zh_hans';
import fetchBooks from './fetchBooks';
import write2fs from './write2fs';
import { bibleGraph, doneGraph } from './asciiGraph';
import chalk from 'chalk';

const writeTsv = async (obj: any, _bookNamePairs: any, _bookVersion:BookVersion) => {
  for await (const [bookId, objBody] of Object.entries<object>(obj)) {
    const nameObj = _bookNamePairs[bookId];
    const zhFullName = nameObj['zh_hans_full'];
    const zhShortName = nameObj['zh_hans_short'];
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

bibleGraph();

const bookVersion: BookVersion = 'cns';

zhHans().then(
  (resolved:any) => {
    console.log('Got all simplified chinese book titles.');
    fetchBooks(bookVersion).then(
      async (resol:any) => {
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
      (rejec:any) => {
        console.log(chalk.bold.underline.redBright('Failed to fetch & parse whole bible with following reason:'));
        console.log(rejec);
      }
    );
  },
  (reason:any) => {
    console.log(chalk.bold.underline.redBright('Got rejected while fetching book titles.'));
    console.log(reason);
  }
);

// Format in .tsv file:
// <Fullname>\t<Shortname>\t<Book ID>\t<Chapter ID>\t<verse ID>\t<verse content>\n
