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
var ghc = require("../index");
var fs = require("fs");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var store, parsedCommits, filtered, changelog, rendered;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ghc.Store.openOrCreate('./changelog.json', 'autosave')];
                case 1:
                    store = _a.sent();
                    return [4 /*yield*/, ghc.parseUntrackedCommits(store, { path: './' })];
                case 2:
                    parsedCommits = _a.sent();
                    return [4 /*yield*/, ghc.filterParsedCommits(store, parsedCommits, function (x) {
                            return {
                                'log': x.message.split(';').map(function (y) { return y.trim(); })
                            };
                        })];
                case 3:
                    filtered = _a.sent();
                    return [4 /*yield*/, ghc.toChangelog(store, filtered)];
                case 4:
                    changelog = _a.sent();
                    rendered = ghc.renderChangelog(store, {
                        entries: changelog,
                        categories: 'all',
                    });
                    fs.writeFile('./changelog.md', rendered, 'utf8', function (err) {
                        if (err)
                            console.error(err);
                        else
                            console.log('ok');
                    });
                    return [2 /*return*/];
            }
        });
    });
}
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlL2V4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhCQUFnQztBQUNoQyx1QkFBeUI7QUFFekI7Ozs7O3dCQUNrQixxQkFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUMsRUFBQTs7b0JBQXBFLEtBQUssR0FBRyxTQUE0RDtvQkFDcEQscUJBQU0sR0FBRyxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFBOztvQkFBdEUsYUFBYSxHQUFHLFNBQXNEO29CQUMzRCxxQkFBTSxHQUFHLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxVQUFDLENBQUM7NEJBQ25FLE1BQU0sQ0FBQztnQ0FDSCxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFSLENBQVEsQ0FBQzs2QkFDakQsQ0FBQTt3QkFDTCxDQUFDLENBQUMsRUFBQTs7b0JBSkksUUFBUSxHQUFHLFNBSWY7b0JBQ2dCLHFCQUFNLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFBOztvQkFBbEQsU0FBUyxHQUFHLFNBQXNDO29CQUNsRCxRQUFRLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUU7d0JBQ3hDLE9BQU8sRUFBRSxTQUFTO3dCQUNsQixVQUFVLEVBQUUsS0FBSztxQkFDcEIsQ0FBQyxDQUFDO29CQUVILEVBQUUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFBLEdBQUc7d0JBQ2hELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQzs0QkFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM1QixJQUFJOzRCQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzNCLENBQUMsQ0FBQyxDQUFDOzs7OztDQUNOO0FBRUQsSUFBSSxFQUFFLENBQUMifQ==