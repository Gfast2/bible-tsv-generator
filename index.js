const englishNamePairs = require('./getEnglishNamePairs');
const fetchBook = require('./fetchBook');

const bibleObj = {}; // Whole bible in Json format

const recrusiveBookFetcher = async bookNames => {
  const namePairs = Object.entries(bookNames);
  const [book2Read, ...bookRest] = namePairs;
  const bookFullName = book2Read[0];
  const bookShortName = book2Read[1];
  const restBooks = {};
  namePairs.map(([fullName, shortName]) => {
    if (fullName !== bookFullName) {
      restBooks[fullName] = shortName;
    }
  });
  try {
    const bookObj = await fetchBook(bookShortName);
    bibleObj[bookFullName] = bookObj;
    if (bookRest.length === 0) {
      return Promise.resolve('All books get fetched sucessfully');
    }
    return await recrusiveBookFetcher(restBooks);
  } catch (e) {
    return Promise.reject(`Error triggered while fetching book ${bookFullName}`);
  }
};

englishNamePairs().then(
  resolved => {
    // TODO: fetch data from internet books for books
    recrusiveBookFetcher(resolved).then(
      resol => {
        console.log(resol);
      },
      rejec => {
        console.log('rejec');
        console.log(rejec);
      }
    );
  },
  reason => {
    console.log('rejected while parsing english full / short name pairs.');
    console.log(reason);
  }
);
