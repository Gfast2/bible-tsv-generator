import chalk from 'chalk';

export const bibleGraph = (): void =>
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

export const failGraph = (): void =>
  console.log(
    chalk.redBright.bold(`

 _
| |__  _   _  __ _
| '_ \\| | | |/ _\` |
| |_) | |_| | (_| |
|_.__/ \\__,_|\\__, |
             |___/

`)
  );

export const doneGraph = (): void =>
  console.log(
    chalk.greenBright.bold(`

 _____  _____  _____  _____
|  _  \\/  _  \\/  _  \\/   __\\
|  |  ||  |  ||  |  ||   __|
|_____/\\_____/\\__|__/\\_____/

`)
  );

export const byeGraph = (): string => {
  let w = '-------------------------------------------------------\n';
  w += '                .---.             \n';
  w += '                : .; :            \n';
  // eslint-disable-next-line quotes
  w += `                :   .'.-..-. .--. \n`;
  // eslint-disable-next-line quotes
  w += `                : .; :: : ; : ' '_.'\n`;
  // eslint-disable-next-line quotes
  w += `                ` + ": ___.'`._. :`.__.'\n";
  // eslint-disable-next-line quotes
  w += `                  .-. :      \n`;
  // eslint-disable-next-line quotes
  w += `                ` + "       `._.'       \n";
  w += '-------------------------------------------------------\n';
  return w;
};

export const helpGen = (): string => {
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
