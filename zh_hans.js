// return object that return simplified chinese book titles
const zh_hant = require('./zh_hant');
const chineseConv = require('chinese-conv');

module.exports = async () =>
  await zh_hant().then(
    resolved => {
      const simplifiedChineseObj = {};
      Object.entries(resolved).forEach(([key, val]) => {
        const newVal = {};
        Object.entries(val).forEach(([cKey, cVal]) => {
          if (cVal === undefined) {
            return; // protect from 'undefined' for translations function call
          } else if (cKey === 'zh_hant_full') {
            newVal.zh_hans_full = chineseConv.sify(cVal);
          } else if (cKey === 'zh_hant_short') {
            newVal.zh_hans_short = chineseConv.sify(cVal);
          } else {
            newVal[cKey] = cVal;
          }
        });
        simplifiedChineseObj[key] = newVal;
      });
      return Promise.resolve(simplifiedChineseObj);
    },
    rejected => {
      console.log('rejected');
      console.log(rejected);
      return Promise.reject(rejected);
    }
  );
