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
Object.defineProperty(exports, "__esModule", { value: true });
var Git = require("nodegit");
var NodePath = require("path");
/**
 * Parse untracked commits
 * * `path` - absolute path to repository
 * * `branchName` - target branch name; will be used current by default
 * * `trackedBranches` - if not privded, all commits will be parsed
 * * `onlyLastCommit` - pick only last (top) commit
 */
function parseUntrackedCommits(store, _a) {
    var _b = _a.path, path = _b === void 0 ? NodePath.resolve('./') : _b, branchName = _a.branchName, onlyLastCommit = _a.onlyLastCommit;
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var repo, branchRef, commit, comm, SortByTime, history;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Git.Repository.open(path)];
                case 1:
                    repo = _c.sent();
                    return [4 /*yield*/, (branchName ? repo.getBranch(branchName) : repo.getCurrentBranch())];
                case 2:
                    branchRef = _c.sent();
                    if (!branchName)
                        branchName = branchRef.name();
                    return [4 /*yield*/, repo.getBranchCommit(branchRef)];
                case 3:
                    commit = _c.sent();
                    if (!(branchName in store.data.trackedBranches)) {
                        store.data.trackedBranches[branchName] = {
                            lastCommitDateTimeUTC: 0,
                            lastCommitHash: ''
                        };
                    }
                    if (!onlyLastCommit) return [3 /*break*/, 7];
                    return [4 /*yield*/, parseCommit(commit, branchName)];
                case 4:
                    comm = _c.sent();
                    if (!(store.data.trackedBranches[branchName].lastCommitHash !== comm.commitHash)) return [3 /*break*/, 6];
                    store.data.parsedHistory.push(comm);
                    store.data.trackedBranches[branchName].lastCommitDateTimeUTC = comm.datetimeUTC;
                    store.data.trackedBranches[branchName].lastCommitHash = comm.commitHash;
                    return [4 /*yield*/, store.autoSave()];
                case 5:
                    _c.sent();
                    return [2 /*return*/, [comm]];
                case 6: return [2 /*return*/, []];
                case 7:
                    SortByTime = 2 /* TIME */;
                    history = commit.history(SortByTime);
                    return [2 /*return*/, new Promise(function (resolve) {
                            var commits = [];
                            var stopParse = false;
                            history.on('commit', function (commit) { return __awaiter(_this, void 0, void 0, function () {
                                var commitHash, comm;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (stopParse)
                                                return [2 /*return*/];
                                            commitHash = commit.id().tostrS();
                                            if (store.data.trackedBranches[branchName].lastCommitHash === commitHash) {
                                                stopParse = true;
                                                // history.stop();
                                                return [2 /*return*/];
                                            }
                                            return [4 /*yield*/, parseCommit(commit, branchName)];
                                        case 1:
                                            comm = _a.sent();
                                            commits.push(comm);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            history.on('end', function () { return __awaiter(_this, void 0, void 0, function () {
                                var commits_1, commits_1_1, comm, e_1, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            try {
                                                for (commits_1 = __values(commits), commits_1_1 = commits_1.next(); !commits_1_1.done; commits_1_1 = commits_1.next()) {
                                                    comm = commits_1_1.value;
                                                    store.data.parsedHistory.push(comm);
                                                }
                                            }
                                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                            finally {
                                                try {
                                                    if (commits_1_1 && !commits_1_1.done && (_a = commits_1.return)) _a.call(commits_1);
                                                }
                                                finally { if (e_1) throw e_1.error; }
                                            }
                                            if (commits.length !== 0) {
                                                store.data.trackedBranches[branchName].lastCommitDateTimeUTC = commits[0].datetimeUTC;
                                                store.data.trackedBranches[branchName].lastCommitHash = commits[0].commitHash;
                                            }
                                            return [4 /*yield*/, store.autoSave()];
                                        case 1:
                                            _b.sent();
                                            resolve(commits);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            history.start();
                        })];
            }
        });
    });
}
exports.parseUntrackedCommits = parseUntrackedCommits;
function parseCommit(commit, branchName) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = {
                        datetimeUTC: commit.time(),
                        authorName: commit.author().name,
                        branchName: branchName,
                        commitHash: commit.id().tostrS(),
                        message: commit.message()
                    };
                    return [4 /*yield*/, listCommitFiles(commit)];
                case 1: return [2 /*return*/, (_a.files = _b.sent(),
                        _a.commitToUnreleasedChangelog = false,
                        _a)];
            }
        });
    });
}
exports.parseCommit = parseCommit;
function listCommitFiles(commit) {
    return __awaiter(this, void 0, void 0, function () {
        var files, tree, walker;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = [];
                    return [4 /*yield*/, commit.getTree()];
                case 1:
                    tree = _a.sent();
                    walker = tree.walk();
                    walker.on('entry', function (entry) {
                        files.push(entry.path());
                    });
                    return [2 /*return*/, new Promise(function (resolve) {
                            walker.on('end', function () {
                                resolve(files);
                            });
                            walker.start();
                        })];
            }
        });
    });
}
exports.listCommitFiles = listCommitFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2dpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUErQjtBQUMvQiwrQkFBaUM7QUFLakM7Ozs7OztHQU1HO0FBQ0gsK0JBQTRDLEtBQVksRUFBRSxFQVF6RDtRQVBHLFlBQTZCLEVBQTdCLGtEQUE2QixFQUM3QiwwQkFBVSxFQUNWLGtDQUFjOzs7Ozs7d0JBTUQscUJBQU0sR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUE7O29CQUF0QyxJQUFJLEdBQUcsU0FBK0I7b0JBQzFCLHFCQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFBOztvQkFBckYsU0FBUyxHQUFHLFNBQXlFO29CQUMzRixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQzt3QkFBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNoQyxxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxFQUFBOztvQkFBOUMsTUFBTSxHQUFHLFNBQXFDO29CQUVwRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRzs0QkFDckMscUJBQXFCLEVBQUUsQ0FBQzs0QkFDeEIsY0FBYyxFQUFFLEVBQUU7eUJBQ3JCLENBQUM7b0JBQ04sQ0FBQzt5QkFFRyxjQUFjLEVBQWQsd0JBQWM7b0JBQ0QscUJBQU0sV0FBVyxDQUFDLE1BQU0sRUFBRSxVQUFV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