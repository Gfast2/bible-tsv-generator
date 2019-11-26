const englishNamePairs = require('./getEnglishNamePairs');
const fetchBook = require('./fetchBook');

englishNamePairs().then(
  resolved => {
    // TODO: fetch data from internet books for books
    const tmp = {
      Genesis: 'Gen',
    };
    fetchBook(tmp.Genesis).then(
      resolve => {
        console.log(resolve);
      },
      reje => {
        console.log('rejected while fetching data.');
        console.log(reje);
      }
    );
  },
  reason => {
    console.log('rejected while parsing english full / short name paars.');
    console.log(reason);
  }
);
