const zhHans = require('./zh_hans');
const fetchBooks = require('./fetchBooks');
const write2fs = require('./write2fs');
const chalk = require('chalk');

interface Verse {
  id: string;
  content: string;
}

const writeTsv = async (obj:any, _bookNamePairs:any) => {
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
              await write2fs(line);
            } catch (error) {
              return error;
            }
          }
        }
      }
    }
  }
};

const bibleGraph = () =>
  console.log(
    chalk.yellowBright.bold(`

         ,   ,
        /////|
       ///// |
      /////  |
     |~~~| | |
     |===| |/|
     | B |/| |
     | I | | |
     | B | | |
     | L |  /
     | E | /
     |===|/
jgs  '---'

`)
  );
bibleGraph();

const doneGraph = () =>
  console.log(
    chalk.greenBright.bold(`

 _____  _____  _____  _____
|  _  \\/  _  \\/  _  \\/   __\\
|  |  ||  |  ||  |  ||   __|
|_____/\\_____/\\__|__/\\_____/

`)
  );

zhHans().then(
  (resolved:any) => {
    console.log('Got all simplified chinese book titles.');
    fetchBooks().then(
      async (resol:any) => {
        console.log('Got all simplified chinese book contents.');
        const wholeBible = resol.version;
        const bookNamePairs = resolved;
        const clearExistContent = true;
        await write2fs('', clearExistContent);
        await writeTsv(wholeBible, bookNamePairs).then(
          () => {
            doneGraph();
            console.log(
              chalk.bold.green(
                `All done properly!
                The simplified chinese bible can be found in repo root directory with name: `
              ) + chalk.inverse.underline.yellowBright('"cns.tsv"')
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
