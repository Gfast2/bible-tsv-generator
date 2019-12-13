import { bibleGraph, doneGraph, byeGraph, helpGen } from './asciiGraph';
import chalk from 'chalk';
// import { BookVersion } from '../types/globals';
import ora from 'ora';
import inquirer from 'inquirer';
import bookGenerator from './bookGenerator';

// const bookVersion: BookVersion = 'cns';

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
          console.log(chalk.yellowBright(byeGraph()));
          process.exit(0);
          break;
        }
        case 'cns':
        case 'cnt':
        case 'cus':
        case 'cut':{
          let thing:any;
          try {
            thing = await bookGenerator(answers.command);
          }catch(e) {
            console.log('failed because:');
            console.log(e);
          }
          console.group();
          console.log('The thing is: ');
          console.log(thing);
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
