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
    var titleType, _a, _b, _c, bookId, objBody, nameObj, zhFullName, zhShortName, _d, _e, _f, key, value, _g, _h, _j, k, verses, chapterID, _k, _l, _m, verseID, verseContent, line, e_1_1, e_2_1, e_3_1, e_4_1;
    var e_4, _o, e_3, _p, e_2, _q, e_1, _r;
    return __generator(this, function (_s) {
        switch (_s.label) {
            case 0:
                titleType = _bookVersion === 'cns' || _bookVersion === 'cus' ? 'simplified' : 'traditional';
                _s.label = 1;
            case 1:
                _s.trys.push([1, 40, 41, 46]);
                _a = __asyncValues(Object.entries(obj));
                _s.label = 2;
            case 2: return [4 /*yield*/, _a.next()];
            case 3:
                if (!(_b = _s.sent(), !_b.done)) return [3 /*break*/, 39];
                _c = _b.value, bookId = _c[0], objBody = _c[1];
                nameObj = _bookNamePairs[bookId];
                zhFullName = titleType === 'simplified' ? nameObj['zhHansFull'] : nameObj['zhHantFull'];
                zhShortName = titleType === 'simplified' ? nameObj['zhHansShort'] : nameObj['zhHantShort'];
                console.log(chalk_1.default.bold.dim('Writing down book ') + chalk_1.default.inverse.whiteBright(zhFullName));
                _s.label = 4;
            case 4:
                _s.trys.push([4, 32, 33, 38]);
                _d = __asyncValues(Object.entries(objBody));
                _s.label = 5;
            case 5: return [4 /*yield*/, _d.next()];
            case 6:
                if (!(_e = _s.sent(), !_e.done)) return [3 /*break*/, 31];
                _f = _e.value, key = _f[0], value = _f[1];
                if (!(key === 'book')) return [3 /*break*/, 30];
                _s.label = 7;
            case 7:
                _s.trys.push([7, 24, 25, 30]);
                _g = __asyncValues(Object.entries(value));
                _s.label = 8;
            case 8: return [4 /*yield*/, _g.next()];
            case 9:
                if (!(_h = _s.sent(), !_h.done)) return [3 /*break*/, 23];
                _j = _h.value, k = _j[0], verses = _j[1];
                chapterID = k;
                _s.label = 10;
            case 10:
                _s.trys.push([10, 16, 17, 22]);
                _k = __asyncValues(Object.entries(verses));
                _s.label = 11;
            case 11: return [4 /*yield*/, _k.next()];
            case 12:
                if (!(_l = _s.sent(), !_l.done)) return [3 /*break*/, 15];
                _m = _l.value, verseID = _m[0], verseContent = _m[1];
                line = zhFullName + "\t" + zhShortName + "\t" + bookId + "\t" + chapterID + "\t" + verseID + "\t" + verseContent + "\n";
                return [4 /*yield*/, write2fs_1.default(line, _bookVersion)];
            case 13:
                _s.sent();
                _s.label = 14;
            case 14: return [3 /*break*/, 11];
            case 15: return [3 /*break*/, 22];
            case 16:
                e_1_1 = _s.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 22];
            case 17:
                _s.trys.push([17, , 20, 21]);
                if (!(_l && !_l.done && (_r = _k.return))) return [3 /*break*/, 19];
                return [4 /*yield*/, _r.call(_k)];
            case 18:
                _s.sent();
                _s.label = 19;
            case 19: return [3 /*break*/, 21];
            case 20:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 21: return [7 /*endfinally*/];
            case 22: return [3 /*break*/, 8];
            case 23: return [3 /*break*/, 30];
            case 24:
                e_2_1 = _s.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 30];
            case 25:
                _s.trys.push([25, , 28, 29]);
                if (!(_h && !_h.done && (_q = _g.return))) return [3 /*break*/, 27];
                return [4 /*yield*/, _q.call(_g)];
            case 26:
                _s.sent();
                _s.label = 27;
            case 27: return [3 /*break*/, 29];
            case 28:
                if (e_2) throw e_2.error;
                return [7 /*endfinally*/];
            case 29: return [7 /*endfinally*/];
            case 30: return [3 /*break*/, 5];
            case 31: return [3 /*break*/, 38];
            case 32:
                e_3_1 = _s.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 38];
            case 33:
                _s.trys.push([33, , 36, 37]);
                if (!(_e && !_e.done && (_p = _d.return))) return [3 /*break*/, 35];
                return [4 /*yield*/, _p.call(_d)];
            case 34:
                _s.sent();
                _s.label = 35;
            case 35: return [3 /*break*/, 37];
            case 36:
                if (e_3) throw e_3.error;
                return [7 /*endfinally*/];
            case 37: return [7 /*endfinally*/];
            case 38: return [3 /*break*/, 2];
            case 39: return [3 /*break*/, 46];
            case 40:
                e_4_1 = _s.sent();
                e_4 = { error: e_4_1 };
                return [3 /*break*/, 46];
            case 41:
                _s.trys.push([41, , 44, 45]);
                if (!(_b && !_b.done && (_o = _a.return))) return [3 /*break*/, 43];
                return [4 /*yield*/, _o.call(_a)];
            case 42:
                _s.sent();
                _s.label = 43;
            case 43: return [3 /*break*/, 45];
            case 44:
                if (e_4) throw e_4.error;
                return [7 /*endfinally*/];
            case 45: return [7 /*endfinally*/];
            case 46: return [2 /*return*/, 'succeed'];
        }
    });
}); };
exports.default = (function (bookVersion) { return __awaiter(void 0, void 0, void 0, function () {
    var bookNamePairs, bookObj, wholeBible, clearExistContent, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, zh_hans_1.default()];
            case 1:
                bookNamePairs = _a.sent();
                return [4 /*yield*/, fetchBooks_1.default(bookVersion)];
            case 2:
                bookObj = _a.sent();
                wholeBible = bookObj.version;
                clearExistContent = true;
                return [4 /*yield*/, write2fs_1.default('', bookVersion, clearExistContent)];
            case 3:
                _a.sent(); // Clear old contents
                return [4 /*yield*/, writeTsv(wholeBible, bookNamePairs, bookVersion)];
            case 4:
                _a.sent();
                return [2 /*return*/, 0 /* succeed */];
            case 5:
                e_5 = _a.sent();
                console.log(chalk_1.default.bold.underline.redBright('Got Problem when generating books. Error Message:\n' + e_5));
                return [2 /*return*/, 1 /* failed */];
            case 6: return [2 /*return*/];
        }
    });
}); });
// Format in .tsv file:
// <Fullname>\t<Shortname>\t<Book ID>\t<Chapter ID>\t<verse ID>\t<verse content>\n
