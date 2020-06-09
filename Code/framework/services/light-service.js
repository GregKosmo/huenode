"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var hue_service_1 = require("./hue-service");
var light_state_1 = require("../models/light-state");
var LightService = /** @class */ (function (_super) {
    __extends(LightService, _super);
    function LightService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LightService.getAllLights = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.get.call(this, LightService.LIGHTS_PATH)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LightService.updateState = function (id, state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.put.call(this, LightService.LIGHTS_PATH + "/" + id + "/" + LightService.STATE_PATH, state)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LightService.turnOnLights = function () {
        var ids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ids[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a, ids_1, id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = 0, ids_1 = ids;
                        _b.label = 1;
                    case 1:
                        if (!(_a < ids_1.length)) return [3 /*break*/, 4];
                        id = ids_1[_a];
                        return [4 /*yield*/, LightService.turnOnLight(id)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _a++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightService.turnOffLights = function () {
        var ids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ids[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a, ids_2, id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = 0, ids_2 = ids;
                        _b.label = 1;
                    case 1:
                        if (!(_a < ids_2.length)) return [3 /*break*/, 4];
                        id = ids_2[_a];
                        return [4 /*yield*/, LightService.turnOffLight(id)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _a++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LightService.turnOnLight = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var lightState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lightState = new light_state_1.LightState();
                        lightState.on = true;
                        return [4 /*yield*/, LightService.updateState(id, lightState)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LightService.turnOffLight = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var lightState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lightState = new light_state_1.LightState();
                        lightState.on = false;
                        return [4 /*yield*/, LightService.updateState(id, lightState)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LightService.LIGHTS_PATH = 'lights';
    LightService.STATE_PATH = 'state';
    return LightService;
}(hue_service_1.HueService));
exports.LightService = LightService;
