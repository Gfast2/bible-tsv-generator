// Fetch the actual book and return content as json object
const bookUrl = 'https://getbible.net/index.php?view=json&v=cus&p=';
const axios = require('axios');

module.exports = async bookShortName =>
  await axios.get(bookUrl + bookShortName).then(
    resolved => {
      // {
      //   "1":{
      //     "chapter_nr": 1,
      //     "chapter":
      //     "1": {
      //             "verse_nr":"1",
      //             "verse:"起初， 神創造天地。"
      //           },
      //     "2":...
      //   }
      // }
      if (resolved.status !== 200 || resolved.statusText !== 'OK') {
        return Promise.reject('Failed to parse response of book: ' + bookShortName);
      }
      const raw = resolved.data;
      const tmp = raw.substring(1, raw.length - 2);
      let book = {};
      const book2Return = {};
      try {
        book = JSON.parse(tmp).book;
      } catch (error) {
        return Promise.reject(`Failed to convert book ${bookShortName} to json`);
      }
      Object.entries(book).map(([key, value]) => {
        const transChapter = {};
        Object.entries(value).map(([k, v]) => {
          if (k === 'chapter') {
            Object.entries(v).map(([nam, sentenceObj]) => {
              transChapter[nam] = decodeURI(sentenceObj.verse).replace(/\r\n/, '');
            });
          }
        });
        book2Return[key] = transChapter;
      });
      return Promise.resolve(book2Return);
    },
    rejected => {
      return Promise.reject(rejected);
    }
  );
