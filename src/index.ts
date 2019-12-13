import zhHans from './zh_hans';
import fetchBooks from './fetchBooks';
import write2fs from './write2fs';
import { bibleGraph, doneGraph } from './asciiGraph';
import chalk from 'chalk';
import { BookVersion } from '../types/globals';
import ora from 'ora';
import inquirer from 'inquirer';

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
              return await write2fs(line, _bookVersion);
            } catch (error) {
              return error;
            }
          }
        }
      }
    }
  }
};



const bookVersion: BookVersion = 'cns';

const helpGen = (): string => {
  let w = '-------------------------------------------------------\n';
  w += `${chalk.red('Description:')}\n`;
  w += '  A small CLI software that generate tsv format bible \n';
  w += `  for another sweet CLI software (${chalk.underline('https://github.com/Gfast2/kjv')}) \n`;
  w += '  that help you search / read bible in the most efficient\n';
  w += '  fashion. Read more in README of the repo.\n';
  w += `${chalk.red('Version:')}\n`;
  w += '  2.0.0\n';
  w += '-------------------------------------------------------\n';
  return w;
};

const byeGen = (): string => {
  let w = '-------------------------------------------------------\n';
  w += '                .---.             \n';
  w += '                : .; :            \n';
  w += `                :   .'.-..-. .--. \n`;
  w += `                : .; :: : ; : ' '_.'\n`;
  w += `                ` + ": ___.'`._. :`.__.'\n";
  w += `                  .-. :      \n`;
  w += `                ` + "       `._.'       \n";
  w += '-------------------------------------------------------\n';
  return w;
};

// TODO: Here I add logic acutally let the user select what they would like to download
const cliMenu = (): void => {
  const availChoices = [
    { name: 'Chinese: NCV Simplified', value: 'cns' },
    { name: 'Chinese: NCV Traditional', value: 'cnt' },
    { name: 'Chinese: Union Simplified', value: 'cus' },
    { name: 'Chinese: Union Traditional', value: 'cut' },
    new inquirer.Separator(),
    { name: 'Help', value: 'help' },
    { name: 'Quit', value: 'quit' },
  ];
  type answersType = {
    command: string;
  };
  inquirer
    .prompt({
      type: 'list',
      name: 'command',
      message: 'What would you like to do',
      choices: availChoices,
    })
    .then(async (answers: answersType) => {
      console.log(answers);
      switch (answers.command) {
        case 'help': {
          console.log(chalk.yellowBright(helpGen()));
          cliMenu();
          break;
        }
        case 'quit': {
          console.log(chalk.yellowBright(byeGen()));
          process.exit(0);
          break;
        }
        case '': {
          break;
        }
        default:
          break;
      }
    });
};

const main = (): void => {
  bibleGraph();
  cliMenu();
};

main();
/*
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
);
 */

// Format in .tsv file:
// <Fullname>\t<Shortname>\t<Book ID>\t<Chapter ID>\t<verse ID>\t<verse content>\n
