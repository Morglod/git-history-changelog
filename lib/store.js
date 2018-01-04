"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
exports.blankConfig = {
    trackedBranches: {},
    parsedHistory: [],
    unreleasedChangelog: [],
    changelog: [],
    messageCategories: {}
};
var Store = /** @class */ (function () {
    function Store() {
        this.filename = './git-history-changelog.json';
        this.data = __assign({}, exports.blankConfig);
        this.autosave = false;
    }
    Store.prototype.clearChangelog = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.data.changelog = [];
                        return [4 /*yield*/, this.autoSave()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Store.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        fs.writeFile(_this.filename, JSON.stringify(_this.data), function (err) {
                            if (err)
                                reject(err);
                            else
                                resolve(true);
                        });
                    })];
            });
        });
    };
    Store.prototype.autoSave = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.autosave)
                    return [2 /*return*/, true];
                return [2 /*return*/, this.save()];
            });
        });
    };
    Store.openOrCreate = function (filename, autoSave) {
        return __awaiter(this, void 0, void 0, function () {
            var file, fileContent, data, store;
            return __generator(this, function (_a) {
                file = path.resolve(filename);
                fileContent = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : JSON.stringify(exports.blankConfig);
                data = JSON.parse(fileContent);
                store = new Store();
                store.filename = file;
                store.data = data;
                store.autosave = autoSave === 'autosave';
                return [2 /*return*/, store];
            });
        });
    };
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUJBQXlCO0FBQ3pCLDJCQUE2QjtBQUloQixRQUFBLFdBQVcsR0FBbUI7SUFDdkMsZUFBZSxFQUFFLEVBQUU7SUFDbkIsYUFBYSxFQUFFLEVBQUU7SUFDakIsbUJBQW1CLEVBQUUsRUFBRTtJQUN2QixTQUFTLEVBQUUsRUFBRTtJQUNiLGlCQUFpQixFQUFFLEVBQUU7Q0FDeEIsQ0FBQztBQUVGO0lBQUE7UUFDSSxhQUFRLEdBQVcsOEJBQThCLENBQUE7UUFDakQsU0FBSSxnQkFBd0IsbUJBQVcsRUFBRTtRQUN6QyxhQUFRLEdBQVksS0FBSyxDQUFDO0lBa0M5QixDQUFDO0lBaENTLDhCQUFjLEdBQXBCOzs7Ozt3QkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7d0JBQ3pCLHFCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQTs7d0JBQXJCLFNBQXFCLENBQUM7d0JBQ3RCLHNCQUFPOzs7O0tBQ1Y7SUFFSyxvQkFBSSxHQUFWOzs7O2dCQUNJLHNCQUFPLElBQUksT0FBTyxDQUFPLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQ3JDLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxVQUFDLEdBQUc7NEJBQ3ZELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ3JCLElBQUk7Z0NBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN2QixDQUFDLENBQUMsQ0FBQTtvQkFDTixDQUFDLENBQUMsRUFBQTs7O0tBQ0w7SUFFSyx3QkFBUSxHQUFkOzs7Z0JBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUFDLE1BQU0sZ0JBQUMsSUFBSSxFQUFDO2dCQUNoQyxzQkFBTyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUM7OztLQUN0QjtJQUVZLGtCQUFZLEdBQXpCLFVBQTBCLFFBQWdCLEVBQUUsUUFBMkI7Ozs7Z0JBQzdELElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM5QixXQUFXLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQVcsQ0FBQyxDQUFDO2dCQUNoRyxJQUFJLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBRS9DLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO2dCQUMxQixLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDdEIsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxLQUFLLFVBQVUsQ0FBQztnQkFFekMsc0JBQU8sS0FBSyxFQUFDOzs7S0FDaEI7SUFDTCxZQUFDO0FBQUQsQ0FBQyxBQXJDRCxJQXFDQztBQXJDWSxzQkFBSyJ9