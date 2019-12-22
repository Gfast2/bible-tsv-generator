// return object that return simplified chinese book titles
import zhHant from './zh_hant';
import chineseConv from 'chinese-conv';
import { BookNameArr, BookNameObject } from '../types/globals';

// TODO: Figure out how to define in zh_hant.ts define return type to be
// for resolve object, for reject string
export default (): Promise<BookNameArr> =>
  zhHant().then(
    (resolved: BookNameArr) => {
      const simplifiedChineseObj: BookNameArr = {};
      Object.entries<BookNameObject>(resolved).forEach(([key, val]) => {
        const newVal: BookNameObject = {} as BookNameObject;
        Object.entries<string>(val).forEach(([cKey, cVal]) => {
          if (cVal === undefined) {
            return; // protect from 'undefined' for translations function call
          } else if (cKey === 'zhHantFull') {
            newVal.zhHansFull = chineseConv.sify(cVal);
          } else if (cKey === 'zhHantShort') {
            newVal.zhHansShort = chineseConv.sify(cVal);
          } else {
            newVal[cKey] = cVal;
          }
        });
        simplifiedChineseObj[key] = newVal;
      });
      return simplifiedChineseObj;
    },
    (rejected: string) => {
      console.log('The module zh_hans.ts got a rejected Promise from module zh_hant.ts, and pass it along!');
      console.log(`And the rejected message from zh_hant.ts is '${rejected}'`);
      throw rejected;
    }
  );
