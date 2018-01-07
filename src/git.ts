import * as Git from 'nodegit';
import * as NodePath from 'path';
import { EventEmitter } from 'events';
import { TrackedBranches, ParsedHistoryCommit } from './types';
import { Store } from './store';

/**
 * Parse untracked commits  
 * * `branchName` - target branch name; will be used current by default
 * * `trackedBranches` - if not privded, all commits will be parsed  
 * * `onlyLastCommit` - pick only last (top) commit
 */
export async function parseUntrackedCommits(store: Store, {
    branchName,
    onlyLastCommit
}: {
    branchName?: string,
    onlyLastCommit?: boolean
} = {}): Promise<ParsedHistoryCommit[]> {
    const { repo } = store;
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
                // history.stop();
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

export async function parseCommit(commit: Git.Commit, branchName: string): Promise<ParsedHistoryCommit> {
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

export async function listCommitFiles(commit: Git.Commit): Promise<string[]> {
    const files: string[] = [];

    const tree = await commit.getTree();
    const walker = tree.walk() as any;
    walker.on('entry', (entry: Git.TreeEntry) => {
        const entrySha = entry.oid();
        files.push(entry.path());
    });

    return new Promise<string[]>(resolve => {
        walker.on('end', () => {
            resolve(files);
        });
        walker.start();
    });
}

export async function fileContentBlob(store: Store, commitHash: string, filePath: string): Promise<Git.Blob> {
    const commit = await store.repo.getCommit(Git.Oid.fromString(commitHash));
    const tree = await commit.getTree();
    const entry = await tree.entryByPath(filePath);
    return Git.Blob.lookup(store.repo, entry.id());
}

export async function fileContentBuffer(store: Store, commitHash: string, filePath: string): Promise<Buffer> {
    return (await fileContentBlob(store, commitHash, filePath)).content();
}

export async function fileContentString(store: Store, commitHash: string, filePath: string): Promise<string> {
    return (await fileContentBlob(store, commitHash, filePath)).content().toString();
}