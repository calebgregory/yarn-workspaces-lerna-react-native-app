"use strict";
exports.__esModule = true;
exports.init = void 0;
var react_native_fs_1 = require("react-native-fs");
var fs = {
    readFile: function (filename) { return react_native_fs_1.readFile(filename); },
    writeFile: function (filename, content) { return react_native_fs_1.writeFile(filename, content); }
};
function init() {
    return {
        fs: fs
    };
}
exports.init = init;
