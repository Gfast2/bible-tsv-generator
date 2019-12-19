// return object that contains traditional chinese book titles

// Api explaination: https://bible.fhl.net/json/
const siteUrl = 'http://192.168.0.92/listall.html'; // Simulator purpose
// const siteUrl = 'https://bible.fhl.net/json/listall.html';
import axios from 'axios';

export default (): Promise<object | string> =>
  axios.get(siteUrl).then(
    resolved => {
      if (resolved.status !== 200 || resolved.statusText !== 'OK') {
        return Promise.reject(`Request resolved with abnormal http code ${resolved.status} while quering traditional chinese book titles`);
      }
      const toReturn: any = {};
      const lines = resolved.data.split('\n');
      lines.map((e: any) => {
        const ele = e.split(',');
        const BookId = ele[0];
        const englishShort = ele[1];
        const englishFull = ele[2];
        const chineseShort = ele[3];
        const chineseFull = ele[4];
        const englishShorter = ele[5];
        if (englishFull === undefined) {
          return; // filter empty line(s)
        }
        toReturn[BookId] = {
          enFull: englishFull,
          enShort: englishShort,
          enShorter: englishShorter,
          zhHantFull: chineseFull,
          zhHantShort: chineseShort,
        };
      });
      // console.log(toReturn);
      return Promise.resolve(toReturn);
    },
    rejected => {
      return Promise.reject('Failed while fetch traditional chinese Titles. \n' + rejected);
    }
  );
