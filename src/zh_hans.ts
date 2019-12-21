// return object that return simplified chinese book titles
import zhHant from './zh_hant';
import chineseConv from 'chinese-conv';

// TODO: Figure out how to define in zh_hant.ts define return type to be
// for resolve object, for reject string
export default (): Promise<object | string> =>
  zhHant().then(
    (resolved: any /*object*/) /*: object*/ => {
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
      return simplifiedChineseObj;
      // return Promise.resolve(simplifiedChineseObj);
    },
    (rejected: string): string => {
      // return Promise.reject(rejected);
      return rejected;
    }
  );
