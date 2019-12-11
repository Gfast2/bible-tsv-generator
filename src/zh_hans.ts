// return object that return simplified chinese book titles
import zh_hant from './zh_hant';
import chineseConv from 'chinese-conv';

export default async () =>
  await zh_hant().then(
    (resolved:any) => {
      const simplifiedChineseObj:any = {};
      Object.entries<object>(resolved).forEach(([key, val]) => {
        const newVal:any = {};
        Object.entries<any>(val).forEach(([cKey, cVal]) => {
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
    (rejected:any) => {
      return Promise.reject(rejected);
    }
  );
