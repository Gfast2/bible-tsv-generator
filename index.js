const englishNamePairs = require('./getEnglishNamePairs');
const fetchBooks = require('./fetchBooks');
const write2fs = require('./write2fs');

const writeTsv = async (obj, englishNamePairs) => {
  for await (const [bookId, objBody] of Object.entries(obj)) {
    let englishFullName = '';
    for await (const [key, value] of Object.entries(objBody)) {
      if (key === 'book_name') {
        englishFullName = value; // Full Name of the book
      } else if (key === 'book') {
        for await (const [k, verses] of Object.entries(value)) {
          const chapterID = k;
          for await (const [verseID, verseContent] of Object.entries(verses)) {
            let shortName = englishNamePairs[englishFullName];
            if (shortName === undefined) {
              // There were different name flavor for these two books
              if (englishFullName === 'Song of Songs') {
                shortName = 'SSol';
              } else if (englishFullName === 'Acts') {
                shortName = 'Acts';
              }
            }
            const line = `${englishFullName}\t${shortName}\t\t${bookId}\t${chapterID}\t${verseID}\t${verseContent}\n`;
            try {
              await write2fs(line);
            } catch (error) {
              return error;
            }
          }
        }
      }
    }
  }
};

englishNamePairs().then(
  resolved => {
    fetchBooks().then(
      resol => {
        // console.log(resol);
        // console.log(resol.version['62']);
        const wholeBible = resol.version;
        const englishFullShortName = resolved;
        // TODO: get short name from full name
        // TODO: write this actual book into a .tsv file
        writeTsv(wholeBible, englishFullShortName).then(
          () => {
            console.log('All done properly');
          },
          () => {
            console.log('Failed to write down whole book after fetch it from internet.');
          }
        );
      },
      rejec => {
        console.log('Failed to fetch & parse whole bible with following reason:');
        console.log(rejec);
      }
    );
  },
  reason => {
    console.log('rejected while parsing english full / short name pairs.');
    console.log(reason);
  }
);

// Format in .tsv file:
// <English Fullname>\t<English Shortname>\t<Book ID>\t<Chapter ID>\t<verse ID>\t<verse content>\n
