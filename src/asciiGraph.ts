import chalk from 'chalk';

export const bibleGraph = () =>
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

export const doneGraph = () =>
  console.log(
    chalk.greenBright.bold(`

 _____  _____  _____  _____
|  _  \\/  _  \\/  _  \\/   __\\
|  |  ||  |  ||  |  ||   __|
|_____/\\_____/\\__|__/\\_____/

`)
  );