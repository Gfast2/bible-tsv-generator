// return object that contains traditional chinese book titles

// Api explaination: https://bible.fhl.net/json/
const siteUrl = 'https://bible.fhl.net/json/listall.html';
const axios = require('axios');

module.exports = async () =>
  await axios.get(siteUrl).then(
    resolved => {
      if (resolved.status !== 200 || resolved.statusText !== 'OK') {
        return Promise.rejecte('Request rejected when quering tradisional book titles');
      }
      const toReturn = {};
      const lines = resolved.data.split('\n');
      lines.map(e => {
        const ele = e.split(',');
        // const id = ele[0];
        const englishShort = ele[1];
        const englishFull = ele[2];
        const chineseShort = ele[3];
        const chineseFull = ele[4];
        // const englishShorter = ele[5];
        if (englishFull === undefined) {
          return; // filter empty line(s)
        }
        toReturn[englishFull] = {
          en_short: englishShort,
          zh_hant_full: chineseFull,
          zh_hant_short: chineseShort,
        };
      });
      return Promise.resolve(toReturn);
    },
    rejected => {
      return Promise.reject(rejected);
    }
  );
