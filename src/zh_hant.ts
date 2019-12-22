// return object that contains traditional chinese book titles

// Api explaination: https://bible.fhl.net/json/
// const siteUrl = 'http://192.168.0.92/listall.html'; // Simulator purpose
const siteUrl = 'https://bible.fhl.net/json/listall.html';
import axios, { AxiosResponse } from 'axios';

export default (): Promise<object | string> =>
  axios.get(siteUrl).then(
    (resolved: AxiosResponse<string>) => {
      if (resolved.status !== 200 || resolved.statusText !== 'OK') {
        throw `Request resolved with abnormal http code ${resolved.status} while quering traditional chinese book titles`;
      }
      const toReturn: any = {};
      const lines = resolved.data.split('\n').filter(e => e !== '');
      console.log(lines);
      lines.map((e: string) => {
        const ele = e.split(',');
        const BookId = ele[0];
        const englishShort = ele[1];
        const englishFull = ele[2];
        const chineseShort = ele[3];
        const chineseFull = ele[4];
        const englishShorter = ele[5];
        if (englishFull === undefined) {
          console.log('The parsed book name is incorrect');
          throw 'The book name parse result may wrong';
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
      return toReturn;
    },
    (rejected: AxiosResponse<string>) => {
      console.log('Already got rejected in zh_hant.ts when trying to fetch data.');
      throw 'Failed while fetch traditional chinese Titles. \n' + rejected;
    }
  );
