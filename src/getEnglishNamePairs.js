const fs = require('fs');
const readline = require('readline');

const bibleTsv = './kjv.tsv';
const rl = readline.createInterface({
  input: fs.createReadStream(bibleTsv),
});
module.exports = function() {
  return new Promise((resolve, reject) => {
    const nameObj = {};
    rl.on('line', line => {
      const lArr = line.split('\t');
      if (nameObj[lArr[0]] === undefined) {
        nameObj[lArr[0]] = lArr[1];
      }
    });
    rl.on('close', () => {
      resolve(nameObj);
    });
  });
};
