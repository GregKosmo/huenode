"use strict";
exports.__esModule = true;
var ObjectUtils = /** @class */ (function () {
    function ObjectUtils() {
    }
    ObjectUtils.isEmpty = function (object) {
        return object === undefined || object === null;
    };
    ObjectUtils.isAnyEmpty = function () {
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            objects[_i] = arguments[_i];
        }
        for (var _a = 0, objects_1 = objects; _a < objects_1.length; _a++) {
            var object = objects_1[_a];
            if (ObjectUtils.isEmpty(object)) {
                return true;
            }
        }
        return false;
    };
    return ObjectUtils;
}());
exports.ObjectUtils = ObjectUtils;
