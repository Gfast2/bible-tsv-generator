// return object that return simplified chinese book titles
import zhHant from './zh_hant';
import chineseConv from 'chinese-conv';

export default async (): Promise<object> =>
  await zhHant().then(
    (resolved: any) => {
      const simplifiedChineseObj: any = {};
      Object.entries<object>(resolved).forEach(([key, val]) => {
        const newVal: any = {};
        Object.entries<any>(val).forEach(([cKey, cVal]) => {
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
      return Promise.resolve(simplifiedChineseObj);
    },
    (rejected: any) => {
      return Promise.reject(rejected);
    }
  );
