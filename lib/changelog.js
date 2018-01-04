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
Object.defineProperty(exports, "__esModule", { value: true });
function toChangelog(store, commits) {
    return __awaiter(this, void 0, void 0, function () {
        var mapped, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    mapped = commits.map(function (c) { return ({
                        datetimeUTC: c.datetimeUTC,
                        branchName: c.branchName,
                        messages: c.messages
                    }); });
                    store.data.unreleasedChangelog = store.data.unreleasedChangelog.filter(function (x) { return commits.find(function (y) { return y.commitHash === x.commitHash; }) === null; });
                    (_a = store.data.changelog).push.apply(_a, __spread(mapped));
                    return [4 /*yield*/, store.autoSave()];
                case 1:
                    _b.sent();
                    return [2 /*return*/, mapped];
            }
        });
    });
}
exports.toChangelog = toChangelog;
function renderChangelog(_a) {
    var entries = _a.entries, categories = _a.categories, _b = _a.messageRenderer, messageRenderer = _b === void 0 ? renderChangelogMessage : _b, _c = _a.changelogRenderer, changelogRenderer = _c === void 0 ? renderChangelogMessages : _c;
    var rendered = {};
    try {
        for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
            var entry = entries_1_1.value;
            try {
                for (var _d = __values(Object.entries(entry.messages)), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var _f = __read(_e.value, 2), category = _f[0], messages = _f[1];
                    if (categories === 'all' || categories.includes(category)) {
                        if (messages.length !== 0 && !rendered[category])
                            rendered[category] = [];
                        try {
                            for (var messages_1 = __values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
                                var message = messages_1_1.value;
                                var renderedMsg = messageRenderer(category, message);
                                rendered[category].push(renderedMsg);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (messages_1_1 && !messages_1_1.done && (_g = messages_1.return)) _g.call(messages_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_h = _d.return)) _h.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (entries_1_1 && !entries_1_1.done && (_j = entries_1.return)) _j.call(entries_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return changelogRenderer(rendered);
    var e_3, _j, e_2, _h, e_1, _g;
}
exports.renderChangelog = renderChangelog;
function renderChangelogMessage(category, message) {
    return "* " + message;
}
exports.renderChangelogMessage = renderChangelogMessage;
function renderChangelogMessages(messages) {
    return Object.entries(messages).map(function (_a) {
        var _b = __read(_a, 2), category = _b[0], renderedMessage = _b[1];
        return ["# " + category, renderedMessage.join('  \n')].join('  \n');
    }).join('  \n');
}
exports.renderChangelogMessages = renderChangelogMessages;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NoYW5nZWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EscUJBQWtDLEtBQVksRUFBRSxPQUFvQzs7Ozs7O29CQUMxRSxNQUFNLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUM7d0JBQzdCLFdBQVcsRUFBRSxDQUFDLENBQUMsV0FBVzt3QkFDMUIsVUFBVSxFQUFFLENBQUMsQ0FBQyxVQUFVO3dCQUN4QixRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVE7cUJBQ3ZCLENBQUMsRUFKOEIsQ0FJOUIsQ0FBQyxDQUFDO29CQUVKLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsVUFBVSxFQUE3QixDQUE2QixDQUFDLEtBQUssSUFBSSxFQUF6RCxDQUF5RCxDQUFDLENBQUM7b0JBQ3ZJLENBQUEsS0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQSxDQUFDLElBQUksb0JBQUksTUFBTSxHQUFFO29CQUNyQyxxQkFBTSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUE7O29CQUF0QixTQUFzQixDQUFDO29CQUV2QixzQkFBTyxNQUFNLEVBQUM7Ozs7Q0FDakI7QUFaRCxrQ0FZQztBQU9ELHlCQUFnQyxFQVUvQjtRQVRHLG9CQUFPLEVBQ1AsMEJBQVUsRUFDVix1QkFBd0MsRUFBeEMsNkRBQXdDLEVBQ3hDLHlCQUEyQyxFQUEzQyxnRUFBMkM7SUFPM0MsSUFBTSxRQUFRLEdBQXlDLEVBQUUsQ0FBQzs7UUFDMUQsR0FBRyxDQUFBLENBQWdCLElBQUEsWUFBQSxTQUFBLE9BQU8sQ0FBQSxnQ0FBQTtZQUF0QixJQUFNLEtBQUssb0JBQUE7O2dCQUNYLEdBQUcsQ0FBQSxDQUFpQyxJQUFBLEtBQUEsU0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQSxnQkFBQTtvQkFBeEQsSUFBQSx3QkFBc0IsRUFBcEIsZ0JBQVEsRUFBRSxnQkFBUTtvQkFDMUIsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLEtBQUssSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7NEJBQzFFLEdBQUcsQ0FBQyxDQUFrQixJQUFBLGFBQUEsU0FBQSxRQUFRLENBQUEsa0NBQUE7Z0NBQXpCLElBQU0sT0FBTyxxQkFBQTtnQ0FDZCxJQUFNLFdBQVcsR0FBRyxlQUFlLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dDQUN2RCxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZCQUN4Qzs7Ozs7Ozs7O29CQUNMLENBQUM7aUJBQ0o7Ozs7Ozs7OztTQUNKOzs7Ozs7Ozs7SUFDRCxNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBQ3ZDLENBQUM7QUF4QkQsMENBd0JDO0FBRUQsZ0NBQXVDLFFBQWdCLEVBQUUsT0FBZTtJQUNwRSxNQUFNLENBQUMsT0FBSyxPQUFTLENBQUM7QUFDMUIsQ0FBQztBQUZELHdEQUVDO0FBRUQsaUNBQXdDLFFBQTBCO0lBQzlELE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQTZCO1lBQTdCLGtCQUE2QixFQUEzQixnQkFBUSxFQUFFLHVCQUFlO1FBQzVELE1BQU0sQ0FBQyxDQUFFLE9BQUssUUFBVSxFQUFFLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3BCLENBQUM7QUFKRCwwREFJQyJ9