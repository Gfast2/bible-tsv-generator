"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// return object that return simplified chinese book titles
var zh_hant_1 = __importDefault(require("./zh_hant"));
var chinese_conv_1 = __importDefault(require("chinese-conv"));
exports.default = (function () {
    return zh_hant_1.default().then(function (resolved) {
        var simplifiedChineseObj = {};
        Object.entries(resolved).forEach(function (_a) {
            var key = _a[0], val = _a[1];
            var newVal = {};
            Object.entries(val).forEach(function (_a) {
                var cKey = _a[0], cVal = _a[1];
                if (cVal === undefined || cKey === 'zhHansFull' || cKey === 'zhHansShort') {
                    return; // protect from 'undefined' for translations function call
                }
                else if (cKey === 'zhHantFull') {
                    newVal.zhHansFull = chinese_conv_1.default.sify(cVal);
                }
                else if (cKey === 'zhHantShort') {
                    newVal.zhHansShort = chinese_conv_1.default.sify(cVal);
                }
                newVal[cKey] = cVal;
            });
            simplifiedChineseObj[key] = newVal;
        });
        return simplifiedChineseObj;
    }, function (rejected) {
        // console.log('The module zh_hans.ts got a rejected Promise from module zh_hant.ts, and pass it along!');
        // console.log(`And the rejected message from zh_hant.ts is '${rejected}'`);
        throw rejected;
    });
});
