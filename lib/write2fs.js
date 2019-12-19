"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
exports.default = (function (text, _bookVersion, clear) {
    return new Promise(function (resolved, rejectd) {
        fs_1.default.writeFile("../" + _bookVersion + ".tsv", text, {
            encoding: 'utf8',
            mode: 438,
            flag: clear === undefined ? 'a' : 'w',
        }, function (err) {
            if (err) {
                rejectd('Can not write line: ' + text);
            }
            resolved();
        });
    });
});
