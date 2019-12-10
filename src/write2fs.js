const fs = require('fs');

module.exports = (text, clear) => {
  return new Promise((resolved, rejectd) => {
    fs.writeFile(
      './cns.tsv',
      text,
      {
        encoding: 'utf8',
        mode: 0o666,
        flag: clear === undefined ? 'a' : 'w',
      },
      err => {
        if (err) {
          rejectd('Can not write line: ' + text);
        }
        resolved();
      }
    );
  });
};
