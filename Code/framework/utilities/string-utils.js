"use strict";
exports.__esModule = true;
var object_utils_1 = require("./object-utils");
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    StringUtils.isEmpty = function (string) {
        return object_utils_1.ObjectUtils.isEmpty(string) || string.length === 0;
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;
