"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Git = require("nodegit");
/**
 * Parse untracked commits
 * * `branchName` - target branch name; will be used current by default
 * * `trackedBranches` - if not privded, all commits will be parsed
 * * `onlyLastCommit` - pick only last (top) commit
 */
async function parseUntrackedCommits(store, { branchName, onlyLastCommit } = {}) {
    const { repo } = store;
    const branchRef = await (branchName ? repo.getBranch(branchName) : repo.getCurrentBranch());
    if (!branchName)
        branchName = branchRef.name();
    const commit = await repo.getBranchCommit(branchRef);
    if (!(branchName in store.data.trackedBranches)) {
        store.data.trackedBranches[branchName] = {
            lastCommitDateTimeUTC: 0,
            lastCommitHash: ''
        };
    }
    if (onlyLastCommit) {
        const comm = await parseCommit(commit, branchName);
        if (store.data.trackedBranches[branchName].lastCommitHash !== comm.commitHash) {
            store.data.parsedHistory.push(comm);
            store.data.trackedBranches[branchName].lastCommitDateTimeUTC = comm.datetimeUTC;
            store.data.trackedBranches[branchName].lastCommitHash = comm.commitHash;
            await store.autoSave();
            return [comm];
        }
        return [];
    }
    const SortByTime = 2 /* TIME */;
    const history = commit.history(SortByTime);
    return new Promise(resolve => {
        const commits = [];
        let stopParse = false;
        history.on('commit', async (commit) => {
            if (stopParse)
                return;
            const commitHash = commit.id().tostrS();
            if (store.data.trackedBranches[branchName].lastCommitHash === commitHash) {
                stopParse = true;
                // history.stop();
                return;
            }
            const comm = await parseCommit(commit, branchName);
            commits.push(comm);
        });
        history.on('end', async () => {
            for (const comm of commits)
                store.data.parsedHistory.push(comm);
            if (commits.length !== 0) {
                store.data.trackedBranches[branchName].lastCommitDateTimeUTC = commits[0].datetimeUTC;
                store.data.trackedBranches[branchName].lastCommitHash = commits[0].commitHash;
            }
            await store.autoSave();
            resolve(commits);
        });
        history.start();
    });
}
exports.parseUntrackedCommits = parseUntrackedCommits;
async function parseCommit(commit, branchName) {
    return {
        datetimeUTC: commit.time(),
        authorName: commit.author().name,
        branchName,
        commitHash: commit.id().tostrS(),
        message: commit.message(),
        files: await listCommitFiles(commit),
        commitToUnreleasedChangelog: false
    };
}
exports.parseCommit = parseCommit;
async function listCommitFiles(commit) {
    const files = [];
    const tree = await commit.getTree();
    const walker = tree.walk();
    walker.on('entry', (entry) => {
        const entrySha = entry.oid();
        files.push(entry.path());
    });
    return new Promise(resolve => {
        walker.on('end', () => {
            resolve(files);
        });
        walker.start();
    });
}
exports.listCommitFiles = listCommitFiles;
async function fileContentBlob(store, commitHash, filePath) {
    const commit = await store.repo.getCommit(Git.Oid.fromString(commitHash));
    const tree = await commit.getTree();
    const entry = await tree.entryByPath(filePath);
    return Git.Blob.lookup(store.repo, entry.id());
}
exports.fileContentBlob = fileContentBlob;
async function fileContentBuffer(store, commitHash, filePath) {
    return (await fileContentBlob(store, commitHash, filePath)).content();
}
exports.fileContentBuffer = fileContentBuffer;
async function fileContentString(store, commitHash, filePath) {
    return (await fileContentBlob(store, commitHash, filePath)).content().toString();
}
exports.fileContentString = fileContentString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2dpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUErQjtBQU0vQjs7Ozs7R0FLRztBQUNJLEtBQUssZ0NBQWdDLEtBQVksRUFBRSxFQUN0RCxVQUFVLEVBQ1YsY0FBYyxLQUlkLEVBQUU7SUFDRixNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDNUYsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9DLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVyRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxHQUFHO1lBQ3JDLHFCQUFxQixFQUFFLENBQUM7WUFDeEIsY0FBYyxFQUFFLEVBQUU7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBVyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNuRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFD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