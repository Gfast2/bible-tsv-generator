const zhHans = require('./zh_hans');
const fetchBooks = require('./fetchBooks');
const write2fs = require('./write2fs');
const chalk = require('chalk');

const writeTsv = async (obj, _bookNamePairs) => {
  for await (const [bookId, objBody] of Object.entries(obj)) {
    const nameObj = _bookNamePairs[bookId];
    const zhFullName = nameObj['zh_hans_full'];
    const zhShortName = nameObj['zh_hans_short'];
    console.log(chalk.bold.dim('Writing down book ') + chalk.inverse.whiteBright(zhFullName));
    for await (const [key, value] of Object.entries(objBody)) {
      if (key === 'book') {
        for await (const [k, verses] of Object.entries(value)) {
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
  resolved => {
    console.log('Got all simplified chinese book titles.');
    fetchBooks().then(
      async resol => {
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
      rejec => {
        console.log(chalk.bold.underline.redBright('Failed to fetch & parse whole bible with following reason:'));
        console.log(rejec);
      }
    );
  },
  reason => {
    console.log(chalk.bold.underline.redBright('Got rejected while fetching book titles.'));
    console.log(reason);
  }
);

// Format in .tsv file:
// <Fullname>\t<Shortname>\t<Book ID>\t<Chapter ID>\t<verse ID>\t<verse content>\n
