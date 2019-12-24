"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Fetch the actual books and return content as json object
// const bookUrl = 'https://getbible.net/index.php?view=json&v=cns'; // 'cus' for traditional chinese!
var bookUrl = 'https://getbible.net/index.php?view=json&v='; // 'cus' for traditional chinese!
// const bookUrl = 'http://192.168.0.92/cns.html'; // for simulation purpose
var axios_1 = __importDefault(require("axios"));
// Parse each book's content back to humanreadable format.
var decodeEachBook = function (book) {
    var book2Return = {};
    Object.entries(book).map(function (_a) {
        var key = _a[0], value = _a[1];
        var transChapter = {};
        Object.entries(value).map(function (_a) {
            var k = _a[0], v = _a[1];
            if (k === 'chapter') {
                Object.entries(v).map(function (_a) {
                    var nam = _a[0], sentenceObj = _a[1];
                    transChapter[nam] = decodeURI(sentenceObj.verse)
                        .replace(/\r\n/, '')
                        .replace(/\s/g, '') // found "cut" and "cus" version has interesting whitespace between each chinese character
                        .replace(/神/g, ' 神');
                });
            }
        });
        book2Return[key] = transChapter;
    });
    return book2Return;
};
// Parse all books' content
var decodeAllBooks = function (books) {
    var newVersion = {};
    Object.entries(books).map(function (_a) {
        var key = _a[0], object = _a[1];
        newVersion[key] = {};
        Object.entries(object).map(function (_a) {
            var k = _a[0], o = _a[1];
            newVersion[key][k] = k === 'book' ? decodeEachBook(o) : o;
        });
    });
    return newVersion;
};
exports.default = (function (bookVersion) {
    return axios_1.default.get(encodeURI("" + bookUrl + bookVersion)).then(function (resolved) {
        if (resolved.status !== 200 || resolved.statusText !== 'OK') {
            throw 'Failed to parse response books';
        }
        var raw = resolved.data;
        var tmp = raw.substring(1, raw.length - 2);
        var rawBook = {};
        try {
            rawBook = JSON.parse(tmp);
        }
        catch (error) {
            throw 'Failed to convert books to json';
        }
        // TODO: when "version" is not posted by API, it will be "undefined"
        var version = rawBook.version, otherRawBookProperty = __rest(rawBook, ["version"]);
        var parsedBooks = decodeAllBooks(version);
        var theBible = __assign(__assign({}, otherRawBookProperty), { version: parsedBooks });
        return theBible;
    }, function (rejected) {
        throw rejected;
    });
});
// Whole response Body (depth=0)
// {
//   "type": "version",
//   "version_ref": "cus",
//   "direction": "LTR",
//   "version": "[Version Object Body]"
// }
// Version Object (Whole Bible JSON) (depth=1):
// {
//   ...
//   "'63'": {
//     "version": "cus",
//     "book_name": "2 John",
//     "book_nr": 63,
//     "direction": "LTR",
//     "book": "[Book Object Body]"
//   }
//   ...
// }
// Book Object (Each Book Json) (depth=2):
// {
//   "1":{
//     "chapter_nr": 1,
//     "chapter":{
//       "1": {
//               "verse_nr":"1",
//               "verse:"起初， 神創造天地。"
//             },
//       "2":...
//     },
//     ...
//   },
//   ...
// }
/** "BookSingleReturned"
{
  "1": {
    "1":"起初， 神創造天地。"
    ...
  }
  ...
}
 */
