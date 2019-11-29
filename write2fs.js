const fs = require('fs');

module.exports = text => {
  return new Promise((resolved, rejectd) => {
    fs.writeFile(
      './cns.tsv',
      text,
      {
        encoding: 'utf8',
        mode: 0o666,
        flag: 'a',
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
