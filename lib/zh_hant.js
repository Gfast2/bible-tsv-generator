"use strict";
// return object that contains traditional chinese book titles
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Api explaination: https://bible.fhl.net/json/
// const siteUrl = 'http://127.0.0.1/listall.html'; // Simulator purpose
var siteUrl = 'https://bible.fhl.net/json/listall.html';
var axios_1 = __importDefault(require("axios"));
exports.default = (function () {
    return axios_1.default.get(siteUrl).then(function (resolved) {
        if (resolved.status !== 200 || resolved.statusText !== 'OK') {
            throw "Request resolved with abnormal http code " + resolved.status + " while quering traditional chinese book titles";
        }
        var toReturn = {};
        var lines = resolved.data.split('\n').filter(function (e) { return e !== ''; });
        // console.log(lines);
        lines.map(function (e) {
            var ele = e.split(',');
            var BookId = ele[0];
            var englishShort = ele[1];
            var englishFull = ele[2];
            var chineseShort = ele[3];
            var chineseFull = ele[4];
            var englishShorter = ele[5];
            if (englishFull === undefined) {
                console.log('The parsed book name is incorrect');
                throw 'The book name parse result may wrong';
            }
            toReturn[BookId] = {
                enFull: englishFull,
                enShort: englishShort,
                enShorter: englishShorter,
                zhHantFull: chineseFull,
                zhHantShort: chineseShort,
                zhHansFull: '',
                zhHansShort: '',
            };
        });
        // console.log(toReturn);
        return toReturn;
    }, function (rejected) {
        // console.log('Already got rejected in zh_hant.ts when trying to fetch data.');
        throw 'Failed while fetch traditional chinese Titles.' + '\nReason: ' + rejected;
    });
});
