"use strict";
exports.__esModule = true;
exports.init = void 0;
var promises_1 = require("fs/promises");
var fs = {
    readFile: function (filename) { return promises_1.readFile(filename, { encoding: 'utf8' }); },
    writeFile: function (filename, content) { return promises_1.writeFile(filename, content); }
};
function init() {
    return {
        fs: fs
    };
}
exports.init = init;
