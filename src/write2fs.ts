import fs from 'fs';

export default (text:any, clear?:boolean) => new Promise((resolved, rejectd) => {
  fs.writeFile('./cns.tsv', text, {
    encoding: 'utf8',
    mode: 0o666,
    flag: clear === undefined ? 'a' : 'w',
  }, err => {
    if (err) {
      rejectd('Can not write line: ' + text);
    }
    resolved();
  });
});
