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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
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
                            var messages = x.message.split(';').map(function (y) { return y.trim(); });
                            var categorized = {};
                            var defaultCategory = 'log';
                            try {
                                for (var messages_1 = __values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
                                    var msg = messages_1_1.value;
                                    var _a = __read(msg.includes(':') ? msg.split(':') : [defaultCategory, msg], 2), category = _a[0], text = _a[1];
                                    if (!(category in categorized))
                                        categorized[category] = [];
                                    categorized[category].push(text.trim());
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (messages_1_1 && !messages_1_1.done && (_b = messages_1.return)) _b.call(messages_1);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            return categorized;
                            var e_1, _b;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlL2V4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOEJBQWdDO0FBQ2hDLHVCQUF5QjtBQUV6Qjs7Ozs7d0JBQ2tCLHFCQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxFQUFBOztvQkFBcEUsS0FBSyxHQUFHLFNBQTREO29CQUNwRCxxQkFBTSxHQUFHLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUE7O29CQUF0RSxhQUFhLEdBQUcsU0FBc0Q7b0JBQzNELHFCQUFNLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLFVBQUMsQ0FBQzs0QkFDbkUsSUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFSLENBQVEsQ0FBQyxDQUFDOzRCQUN6RCxJQUFNLFdBQVcsR0FBMEIsRUFBRSxDQUFDOzRCQUM5QyxJQUFNLGVBQWUsR0FBRyxLQUFLLENBQUM7O2dDQUU5QixHQUFHLENBQUMsQ0FBYyxJQUFBLGFBQUEsU0FBQSxRQUFRLENBQUEsa0NBQUE7b0NBQXJCLElBQU0sR0FBRyxxQkFBQTtvQ0FDSixJQUFBLDJFQUFrRixFQUFoRixnQkFBUSxFQUFFLFlBQUksQ0FBbUU7b0NBQ3pGLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLENBQUM7d0NBQzNCLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7b0NBQy9CLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7aUNBQzNDOzs7Ozs7Ozs7NEJBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7d0JBQ3ZCLENBQUMsQ0FBQyxFQUFBOztvQkFiSSxRQUFRLEdBQUcsU0FhZjtvQkFDZ0IscUJBQU0sR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQUE7O29CQUFsRCxTQUFTLEdBQUcsU0FBc0M7b0JBQ2xELFFBQVEsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRTt3QkFDeEMsT0FBTyxFQUFFLFNBQVM7d0JBQ2xCLFVBQVUsRUFBRSxLQUFLO3FCQUNwQixDQUFDLENBQUM7b0JBRUgsRUFBRSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQUEsR0FBRzt3QkFDaEQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDOzRCQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzVCLElBQUk7NEJBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDM0IsQ0FBQyxDQUFDLENBQUM7Ozs7O0NBQ047QUFFRCxJQUFJLEVBQUUsQ0FBQyJ9