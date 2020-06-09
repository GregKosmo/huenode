"use strict";
exports.__esModule = true;
var object_utils_1 = require("./object-utils");
var MapUtils = /** @class */ (function () {
    function MapUtils() {
    }
    MapUtils.isEmpty = function (map) {
        return object_utils_1.ObjectUtils.isEmpty(map) || map.size === 0;
    };
    return MapUtils;
}());
exports.MapUtils = MapUtils;
