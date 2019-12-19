"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var write2fs_1 = __importDefault(require("./write2fs"));
var zh_hans_1 = __importDefault(require("./zh_hans"));
var fetchBooks_1 = __importDefault(require("./fetchBooks"));
var writeTsv = function (obj, _bookNamePairs, _bookVersion) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, bookId, objBody, nameObj, zhFullName, zhShortName, _d, _e, _f, key, value, _g, _h, _j, k, verses, chapterID, _k, _l, _m, verseID, verseContent, line, error_1, e_1_1, e_2_1, e_3_1, e_4_1;
    var e_4, _o, e_3, _p, e_2, _q, e_1, _r;
    return __generator(this, function (_s) {
        switch (_s.label) {
            case 0:
                _s.trys.push([0, 41, 42, 47]);
                _a = __asyncValues(Object.entries(obj));
                _s.label = 1;
            case 1: return [4 /*yield*/, _a.next()];
            case 2:
                if (!(_b = _s.sent(), !_b.done)) return [3 /*break*/, 40];
                _c = _b.value, bookId = _c[0], objBody = _c[1];
                nameObj = _bookNamePairs[bookId];
                zhFullName = nameObj['zhHansFull'];
                zhShortName = nameObj['zhHansShort'];
                console.log(chalk_1.default.bold.dim('Writing down book ') + chalk_1.default.inverse.whiteBright(zhFullName));
                _s.label = 3;
            case 3:
                _s.trys.push([3, 33, 34, 39]);
                _d = __asyncValues(Object.entries(objBody));
                _s.label = 4;
            case 4: return [4 /*yield*/, _d.next()];
            case 5:
                if (!(_e = _s.sent(), !_e.done)) return [3 /*break*/, 32];
                _f = _e.value, key = _f[0], value = _f[1];
                if (!(key === 'book')) return [3 /*break*/, 31];
                _s.label = 6;
            case 6:
                _s.trys.push([6, 25, 26, 31]);
                _g = __asyncValues(Object.entries(value));
                _s.label = 7;
            case 7: return [4 /*yield*/, _g.next()];
            case 8:
                if (!(_h = _s.sent(), !_h.done)) return [3 /*break*/, 24];
                _j = _h.value, k = _j[0], verses = _j[1];
                chapterID = k;
                _s.label = 9;
            case 9:
                _s.trys.push([9, 17, 18, 23]);
                _k = __asyncValues(Object.entries(verses));
                _s.label = 10;
            case 10: return [4 /*yield*/, _k.next()];
            case 11:
                if (!(_l = _s.sent(), !_l.done)) return [3 /*break*/, 16];
                _m = _l.value, verseID = _m[0], verseContent = _m[1];
                line = zhFullName + "\t" + zhShortName + "\t" + bookId + "\t" + chapterID + "\t" + verseID + "\t" + verseContent + "\n";
                console.log(line);
                _s.label = 12;
            case 12:
                _s.trys.push([12, 14, , 15]);
                return [4 /*yield*/, write2fs_1.default(line, _bookVersion)];
            case 13: return [2 /*return*/, _s.sent()];
            case 14:
                error_1 = _s.sent();
                return [2 /*return*/, error_1];
            case 15: return [3 /*break*/, 10];
            case 16: return [3 /*break*/, 23];
            case 17:
                e_1_1 = _s.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 23];
            case 18:
                _s.trys.push([18, , 21, 22]);
                if (!(_l && !_l.done && (_r = _k.return))) return [3 /*break*/, 20];
                return [4 /*yield*/, _r.call(_k)];
            case 19:
                _s.sent();
                _s.label = 20;
            case 20: return [3 /*break*/, 22];
            case 21:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 22: return [7 /*endfinally*/];
            case 23: return [3 /*break*/, 7];
            case 24: return [3 /*break*/, 31];
            case 25:
                e_2_1 = _s.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 31];
            case 26:
                _s.trys.push([26, , 29, 30]);
                if (!(_h && !_h.done && (_q = _g.return))) return [3 /*break*/, 28];
                return [4 /*yield*/, _q.call(_g)];
            case 27:
                _s.sent();
                _s.label = 28;
            case 28: return [3 /*break*/, 30];
            case 29:
                if (e_2) throw e_2.error;
                return [7 /*endfinally*/];
            case 30: return [7 /*endfinally*/];
            case 31: return [3 /*break*/, 4];
            case 32: return [3 /*break*/, 39];
            case 33:
                e_3_1 = _s.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 39];
            case 34:
                _s.trys.push([34, , 37, 38]);
                if (!(_e && !_e.done && (_p = _d.return))) return [3 /*break*/, 36];
                return [4 /*yield*/, _p.call(_d)];
            case 35:
                _s.sent();
                _s.label = 36;
            case 36: return [3 /*break*/, 38];
            case 37:
                if (e_3) throw e_3.error;
                return [7 /*endfinally*/];
            case 38: return [7 /*endfinally*/];
            case 39: return [3 /*break*/, 1];
            case 40: return [3 /*break*/, 47];
            case 41:
                e_4_1 = _s.sent();
                e_4 = { error: e_4_1 };
                return [3 /*break*/, 47];
            case 42:
                _s.trys.push([42, , 45, 46]);
                if (!(_b && !_b.done && (_o = _a.return))) return [3 /*break*/, 44];
                return [4 /*yield*/, _o.call(_a)];
            case 43:
                _s.sent();
                _s.label = 44;
            case 44: return [3 /*break*/, 46];
            case 45:
                if (e_4) throw e_4.error;
                return [7 /*endfinally*/];
            case 46: return [7 /*endfinally*/];
            case 47: return [2 /*return*/];
        }
    });
}); };
// export const tmp = (bookVersion: BookVersion) =>
exports.default = (function (bookVersion) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, zh_hans_1.default()
                    .then(function (res) {
                    console.log('Got all simplified chinese book titles.');
                    var bookNamePairs = res;
                    return bookNamePairs;
                })
                    .catch(function (rej) {
                    console.log(chalk_1.default.bold.underline.redBright('Got rejected while fetching book titles.'));
                    console.log(rej);
                    return 'fail';
                })
                    .then(
                // TODO: The first Project to get name can still fail, handle it in this then()
                function (_bookNamePairs) { return __awaiter(void 0, void 0, void 0, function () {
                    var wholeBible, e_5, clearExistContent, e_6, e_7;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                wholeBible = {};
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, fetchBooks_1.default(bookVersion)];
                            case 2:
                                wholeBible = _a.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                e_5 = _a.sent();
                                console.log('Failed to fetch book content.');
                                return [2 /*return*/, Promise.reject('fail')];
                            case 4:
                                console.log('Got all simplified chinese book contents.');
                                clearExistContent = true;
                                _a.label = 5;
                            case 5:
                                _a.trys.push([5, 7, , 8]);
                                return [4 /*yield*/, write2fs_1.default('', bookVersion, clearExistContent)];
                            case 6:
                                _a.sent();
                                return [3 /*break*/, 8];
                            case 7:
                                e_6 = _a.sent();
                                console.log('Failed to clear target file.');
                                return [2 /*return*/, Promise.reject('fail')];
                            case 8:
                                _a.trys.push([8, 10, , 11]);
                                // console.log(_bookNamePairs);
                                // console.log(bookVersion);
                                // console.log(wholeBible);
                                return [4 /*yield*/, writeTsv(wholeBible, _bookNamePairs, bookVersion)];
                            case 9:
                                // console.log(_bookNamePairs);
                                // console.log(bookVersion);
                                // console.log(wholeBible);
                                _a.sent();
                                return [2 /*return*/, Promise.reject('succeed')];
                            case 10:
                                e_7 = _a.sent();
                                console.log('Failed to write content into target file.');
                                return [2 /*return*/, Promise.reject('fail')];
                            case 11: return [2 /*return*/];
                        }
                    });
                }); })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
/*
export default async (bookVersion: BookVersion) =>
  zhHans().then(
    (resolved: any) => {
      console.log('Got all simplified chinese book titles.');
      fetchBooks(bookVersion).then(
        async (resol: any) => {
          console.log('Got all simplified chinese book contents.');
          const wholeBible = resol.version;
          const bookNamePairs = resolved;
          const clearExistContent = true;
          await write2fs('', bookVersion, clearExistContent);
          await writeTsv(wholeBible, bookNamePairs, bookVersion).then(
            () => {
              doneGraph();
              console.log(
                chalk.bold.green(
                  `All done properly!
                  The simplified chinese bible can be found in repo root directory with name: `
                ) + chalk.inverse.underline.yellowBright(`"${bookVersion}.tsv"`)
              );
            },
            () => {
              console.log(chalk.bold.underline.redBright('Failed to write down bible after fetch it from internet correctly.'));
            }
          );
        },
        (rejec: any) => {
          console.log(chalk.bold.underline.redBright('Failed to fetch & parse whole bible with following reason:'));
          console.log(rejec);
        }
      );
    },
    (reason: any) => {
      console.log(chalk.bold.underline.redBright('Got rejected while fetching book titles.'));
      console.log(reason);
    }
  ); */
// Format in .tsv file:
// <Fullname>\t<Shortname>\t<Book ID>\t<Chapter ID>\t<verse ID>\t<verse content>\n
