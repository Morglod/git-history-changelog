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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * filter out commits
 * * `parsedCommits` - from git/parse function
 * * `filter` - filter out commits and pick categorised messages
 * * `onlyMarked` - pick commits only with `commitToUnreleasedChangelog=true` (all by default)
 */
function filterParsedCommits(store, parsedCommits, filter, onlyMarked) {
    return __awaiter(this, void 0, void 0, function () {
        var commits, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    commits = parsedCommits.map(function (pc) {
                        if (onlyMarked && !pc.commitToUnreleasedChangelog)
                            return false;
                        var messages = filter(pc);
                        if (messages === false)
                            return false;
                        return ({
                            authorName: pc.authorName,
                            datetimeUTC: pc.datetimeUTC,
                            branchName: pc.branchName,
                            commitHash: pc.commitHash,
                            messages: messages
                        });
                    }).filter(function (x) { return x !== false; });
                    // filter out mapped
                    store.data.parsedHistory = store.data.parsedHistory.filter(function (x) { return commits.find(function (y) { return y.commitHash === x.commitHash; }) === null; });
                    (_a = store.data.unreleasedChangelog).push.apply(_a, __spread(commits));
                    return [4 /*yield*/, store.autoSave()];
                case 1:
                    _b.sent();
                    return [2 /*return*/, commits];
            }
        });
    });
}
exports.filterParsedCommits = filterParsedCommits;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWl0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21taXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BOzs7OztHQUtHO0FBQ0gsNkJBQTBDLEtBQVksRUFBRSxhQUFvQyxFQUFFLE1BQWUsRUFBRSxVQUErQjs7Ozs7O29CQUNwSSxPQUFPLEdBQWdDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxFQUFFO3dCQUM3RCxFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFLENBQUMsMkJBQTJCLENBQUM7NEJBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzt3QkFDaEUsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUM1QixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDOzRCQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7d0JBQ3JDLE1BQU0sQ0FBQyxDQUFDOzRCQUNKLFVBQVUsRUFBRSxFQUFFLENBQUMsVUFBVTs0QkFDekIsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXOzRCQUMzQixVQUFVLEVBQUUsRUFBRSxDQUFDLFVBQVU7NEJBQ3pCLFVBQVUsRUFBRSxFQUFFLENBQUMsVUFBVTs0QkFDekIsUUFBUSxVQUFBO3lCQUNYLENBQThCLENBQUM7b0JBQ3BDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxLQUFLLEVBQVgsQ0FBVyxDQUFRLENBQUM7b0JBRW5DLG9CQUFvQjtvQkFDcEIsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLFVBQVUsRUFBN0IsQ0FBNkIsQ0FBQyxLQUFLLElBQUksRUFBekQsQ0FBeUQsQ0FBQyxDQUFDO29CQUMzSCxDQUFBLEtBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQSxDQUFDLElBQUksb0JBQUksT0FBTyxHQUFFO29CQUNoRCxxQkFBTSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUE7O29CQUF0QixTQUFzQixDQUFDO29CQUV2QixzQkFBTyxPQUFPLEVBQUM7Ozs7Q0FDbEI7QUFwQkQsa0RBb0JDIn0=