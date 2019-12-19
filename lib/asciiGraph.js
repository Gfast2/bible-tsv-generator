"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
exports.bibleGraph = function () {
    return console.log(chalk_1.default.yellowBright.bold("\n\n         ,   ,\n        /////|\n       ///// |\n      /////  |\n     |~~~| | |\n     |===| |/|\n     | B |/| |\n     | I | | |\n     | B | | |\n     | L |  /\n     | E | /\n     |===|/\njgs  '---'\n\n"));
};
exports.doneGraph = function () {
    return console.log(chalk_1.default.greenBright.bold("\n\n _____  _____  _____  _____\n|  _  \\/  _  \\/  _  \\/   __\\\n|  |  ||  |  ||  |  ||   __|\n|_____/\\_____/\\__|__/\\_____/\n\n"));
};
exports.byeGraph = function () {
    var w = '-------------------------------------------------------\n';
    w += '                .---.             \n';
    w += '                : .; :            \n';
    w += "                :   .'.-..-. .--. \n";
    w += "                : .; :: : ; : ' '_.'\n";
    w += "                " + ": ___.'`._. :`.__.'\n";
    w += "                  .-. :      \n";
    w += "                " + "       `._.'       \n";
    w += '-------------------------------------------------------\n';
    return w;
};
exports.helpGen = function () {
    var w = '-------------------------------------------------------\n';
    w += chalk_1.default.red('Description:') + "\n";
    w += '  A small CLI software that generate tsv format bible \n';
    w += "  for another sweet CLI software (" + chalk_1.default.underline('https://github.com/Gfast2/kjv') + ") \n";
    w += '  that help you search / read bible in the most efficient\n';
    w += '  fashion. Read more in README of the repo.\n';
    w += chalk_1.default.red('Version:') + "\n";
    w += '  2.0.0\n';
    w += '-------------------------------------------------------\n';
    return w;
};
