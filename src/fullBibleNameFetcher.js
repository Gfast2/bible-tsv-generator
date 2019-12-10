const fs = require('fs');

const bibleName = './BibleName.json';
const jObj = JSON.parse(fs.readFileSync(bibleName).toString());
const secObj = jObj.sections;
const secKeyArr = Object.keys(secObj);
let finalArr = [];
secKeyArr.map(e => {
  const tmpArr = secObj[e];
  finalArr = [...finalArr, ...tmpArr];
});
console.log(finalArr);
module.exports = finalArr;
