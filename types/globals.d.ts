/***
 * Define the avaialable book versions
 * @typeparam 'cns' Chinese NCV Simplified
 * @typeparam 'cnt' Chinese NCV Traditional
 * @typeparam 'cus' Chinese Union Simplified
 * @typeparam 'cut';Chinese Union Traditional
 * */
type BookVersion =
  | 'cns' // Chinese: NCV Simplified
  | 'cnt' // Chinese: NCV Traditional
  | 'cus' // Chinese: Union Simplified
  | 'cut';// Chinese: Union Traditional
