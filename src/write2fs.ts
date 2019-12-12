import fs from 'fs';
import { BookVersion } from "../types/globals";

export default (text: any, _bookVersion: BookVersion, clear?:boolean) => new Promise(
  (resolved, rejectd) => {
    fs.writeFile(`./${_bookVersion}.tsv`, text, {
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
