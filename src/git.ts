import * as Git from 'nodegit';
import { EventEmitter } from 'events';
import { TrackedBranches, ParsedHistoryCommit } from './types';
import { Store } from './store';

/**
 * Parse untracked commits  
 * * `path` - absolute path to repository
 * * `branchName` - target branch name; will be used current by default
 * * `trackedBranches` - if not privded, all commits will be parsed  
 * * `onlyLastCommit` - pick only last (top) commit
 */
async function parseUntrackedCommits(store: Store, {
    path,
    branchName,
    onlyLastCommit
}: {
    path: string,
    branchName?: string,
    onlyLastCommit?: boolean
}): Promise<ParsedHistoryCommit[]> {
    const repo = await Git.Repository.open(path);
    const branchRef = await (branchName ? repo.getBranch(branchName) : repo.getCurrentBranch());
    if (!branchName) branchName = branchRef.name();
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
            return [ comm ];
        }
        return [];
    }
    
    const SortByTime = Git.Revwalk.SORT.TIME;
    const history = (commit.history as Function)(SortByTime);

    return new Promise<ParsedHistoryCommit[]>(resolve => {
        const commits: ParsedHistoryCommit[] = [];
        let stopParse: boolean = false;

        history.on('commit', async (commit: Git.Commit) => {
            if (stopParse) return;

            const commitHash = commit.id().tostrS();
            if (store.data.trackedBranches[branchName!].lastCommitHash === commitHash) {
                stopParse = true;
                history.stop();
                return;
            }
            
            const comm = await parseCommit(commit, branchName!);
            commits.push(comm);
        });
    
        (history as EventEmitter).on('end', async () => {
            for(const comm of commits)
                store.data.parsedHistory.push(comm);
            if (commits.length !== 0) {
                store.data.trackedBranches[branchName!].lastCommitDateTimeUTC = commits[0].datetimeUTC;
                store.data.trackedBranches[branchName!].lastCommitHash = commits[0].commitHash;
            }
            await store.autoSave();
            resolve(commits);
        });
    
        history.start();
    });
}

async function parseCommit(commit: Git.Commit, branchName: string): Promise<ParsedHistoryCommit> {
    return {
        datetimeUTC: commit.time(),
        authorName: commit.author().name,
        branchName,
        commitHash: commit.id().tostrS(),
        message: commit.message(),
        files: await listCommitFiles(commit),
        commitToUnreleasedChangelog: false
    }
}

async function listCommitFiles(commit: Git.Commit): Promise<string[]> {
    const files: string[] = [];

    const tree = await commit.getTree();
    const walker = tree.walk() as any;
    walker.on('entry', (entry: Git.TreeEntry) => {
        files.push(entry.path());
    });

    return new Promise<string[]>(resolve => {
        walker.on('end', () => {
            resolve(files);
        });
        walker.start();
    });
}