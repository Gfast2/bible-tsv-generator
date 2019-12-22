/***
 * Define the avaialable book versions
 * @typeparam 'cns' Chinese NCV Simplified
 * @typeparam 'cnt' Chinese NCV Traditional
 * @typeparam 'cus' Chinese Union Simplified
 * @typeparam 'cut';Chinese Union Traditional
 * */
export type BookVersion =
  | 'cns' // Chinese: NCV Simplified
  | 'cnt' // Chinese: NCV Traditional
  | 'cus' // Chinese: Union Simplified
  | 'cut'; // Chinese: Union Traditional

export interface BookNameObject {
  [s: string]: string;
  enFull: string;
  enShort: string;
  enShorter: string;
  zhHantFull: string;
  zhHantShort: string;
  zhHansFull: string;
  zhHansShort: string;
}

export interface BookNameArr {
  [name: string]: BookNameObject;
}
