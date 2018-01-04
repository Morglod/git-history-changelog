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
/**
 * Parse untracked commits
 * * `path` - absolute path to repository
 * * `branchName` - target branch name; will be used current by default
 * * `trackedBranches` - if not privded, all commits will be parsed
 * * `onlyLastCommit` - pick only last (top) commit
 */
function parseUntrackedCommits(store, _a) {
    var path = _a.path, branchName = _a.branchName, onlyLastCommit = _a.onlyLastCommit;
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var repo, branchRef, commit, comm, SortByTime, history;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Git.Repository.open(path)];
                case 1:
                    repo = _b.sent();
                    return [4 /*yield*/, (branchName ? repo.getBranch(branchName) : repo.getCurrentBranch())];
                case 2:
                    branchRef = _b.sent();
                    if (!branchName)
                        branchName = branchRef.name();
                    return [4 /*yield*/, repo.getBranchCommit(branchRef)];
                case 3:
                    commit = _b.sent();
                    if (!(branchName in store.data.trackedBranches)) {
                        store.data.trackedBranches[branchName] = {
                            lastCommitDateTimeUTC: 0,
                            lastCommitHash: ''
                        };
                    }
                    if (!onlyLastCommit) return [3 /*break*/, 7];
                    return [4 /*yield*/, parseCommit(commit, branchName)];
                case 4:
                    comm = _b.sent();
                    if (!(store.data.trackedBranches[branchName].lastCommitHash !== comm.commitHash)) return [3 /*break*/, 6];
                    store.data.parsedHistory.push(comm);
                    store.data.trackedBranches[branchName].lastCommitDateTimeUTC = comm.datetimeUTC;
                    store.data.trackedBranches[branchName].lastCommitHash = comm.commitHash;
                    return [4 /*yield*/, store.autoSave()];
                case 5:
                    _b.sent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2dpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUErQjtBQUsvQjs7Ozs7O0dBTUc7QUFDSCwrQkFBNEMsS0FBWSxFQUFFLEVBUXpEO1FBUEcsY0FBSSxFQUNKLDBCQUFVLEVBQ1Ysa0NBQWM7Ozs7Ozt3QkFNRCxxQkFBTSxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQTs7b0JBQXRDLElBQUksR0FBRyxTQUErQjtvQkFDMUIscUJBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUE7O29CQUFyRixTQUFTLEdBQUcsU0FBeUU7b0JBQzNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO3dCQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2hDLHFCQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEVBQUE7O29CQUE5QyxNQUFNLEdBQUcsU0FBcUM7b0JBRXBELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxHQUFHOzRCQUNyQyxxQkFBcUIsRUFBRSxDQUFDOzRCQUN4QixjQUFjLEVBQUUsRUFBRTt5QkFDckIsQ0FBQztvQkFDTixDQUFDO3lCQUVHLGNBQWMsRUFBZCx3QkFBYztvQkFDRCxxQkFBTSxXQUFXLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxFQUFBOztvQkFBNUMsSUFBSSxHQUFH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