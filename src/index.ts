import { bibleGraph, doneGraph, failGraph, byeGraph, helpGen } from './asciiGraph';
import chalk from 'chalk';
import { BookGenerateResult } from '../types/globals';
// import ora from 'ora';
import inquirer from 'inquirer';
import bookGenerator from './bookGenerator';

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
          console.log(chalk.yellowBright(byeGraph()));
          process.exit(0);
          break;
        }
        case 'cns':
        case 'cnt':
        case 'cus':
        case 'cut': {
          const thing = await bookGenerator(answers.command);
          if (thing === BookGenerateResult.succeed) {
            doneGraph();
          } else if (thing === BookGenerateResult.succeed) {
            failGraph();
          }
          cliMenu();
          break;
        }
        default:
          console.log('If you see this, it means some selection event are not properly handled');
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
// Mock main function for file download parsing
// TODO: Figure out whick type(s) are allowed to be returned here. (ts1055)
const tmpMain = async () => {
  const bookVersion: BookVersion = 'cut';
  try {
    await bookGenerator('cut'); // resolve Promise with book name as payload
    doneGraph();
    console.log(
      chalk.bold.green(
        `All done properly!
                  The simplified chinese bible can be found in repo root directory with name: `
      ) + chalk.inverse.underline.yellowBright(`"${bookVersion}.tsv"`)
    );
  } catch (e) {
    console.log(chalk.bold.underline.redBright('Failed to get bible'));
  }
  // cliMenu();
};

// tmpMain();
*/
