"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
exports.__esModule = true;
var http = require("http");
var object_utils_1 = require("./utilities/object-utils");
var string_utils_1 = require("./utilities/string-utils");
var HttpRequest = /** @class */ (function () {
    function HttpRequest() {
    }
    HttpRequest.get = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("GET: " + path);
                        return [4 /*yield*/, HttpRequest.handleRequest(http.get, path)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpRequest.put = function (host, port, path, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, HttpRequest.handlePostPut(host, port, path, 'PUT', body)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpRequest.post = function (host, port, path, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, HttpRequest.handlePostPut(host, port, path, 'POST', body)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpRequest.handlePostPut = function (host, port, path, method, body) {
        return __awaiter(this, void 0, void 0, function () {
            var data, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            host: host,
                            port: port,
                            path: path,
                            method: "" + method
                        };
                        console.log(method + ": " + host + path);
                        if (!object_utils_1.ObjectUtils.isEmpty(body)) {
                            data = JSON.stringify(body);
                            options.headers = {
                                'Content-Type': 'application/json',
                                'Content-Length': data.length
                            };
                            console.log("body: " + data);
                        }
                        return [4 /*yield*/, HttpRequest.handleRequest(http.request, options, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpRequest.handleRequest = function (request, options, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var req = request(options, function (response) {
                            var returnData = '';
                            response.on('data', function (chunk) {
                                returnData += chunk;
                            });
                            response.on('end', function () {
                                try {
                                    if (!string_utils_1.StringUtils.isEmpty(returnData)) {
                                        var json = JSON.parse(returnData);
                                        if (!(json instanceof Array && !object_utils_1.ObjectUtils.isEmpty(json[0]) && !object_utils_1.ObjectUtils.isEmpty(json[0].error))) {
                                            resolve(json);
                                        }
                                        else {
                                            console.error(json[0].error.description);
                                            reject(json[0].error.description);
                                        }
                                    }
                                }
                                catch (error) {
                                    console.error(error);
                                    console.log(returnData);
                                }
                            });
                            response.on('error', function (error) {
                                console.error(error);
                                reject(error);
                            });
                        });
                        req.on('error', function (error) {
                            console.error(error);
                            reject(error);
                        });
                        if (!object_utils_1.ObjectUtils.isEmpty(data)) {
                            req.write(data);
                        }
                        req.end();
                    })];
            });
        });
    };
    return HttpRequest;
}());
exports.HttpRequest = HttpRequest;
