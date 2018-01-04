import * as Git from 'nodegit';
import { EventEmitter } from 'events';
import { TrackedBranches, ParsedHistoryCommit } from './types';

/**
 * Parse untracked commits  
 * * `path` - absolute path to repository
 * * `branchName` - target branch name; will be used current by default
 * * `trackedBranches` - if not privded, all commits will be parsed  
 * * `onlyLastCommit` - pick only last (top) commit
 */
async function parse({
    path,
    branchName,
    onlyLastCommit,
    trackedBranches
}: {
    path: string,
    branchName?: string,
    trackedBranches?: TrackedBranches,
    onlyLastCommit?: boolean
}): Promise<ParsedHistoryCommit[]> {
    const repo = await Git.Repository.open(path);
    const branchRef = await (branchName ? repo.getBranch(branchName) : repo.getCurrentBranch());
    if (!branchName) branchName = branchRef.name();
    const commit = await repo.getBranchCommit(branchRef);

    if (onlyLastCommit) return [ await parseCommit(commit, branchName) ];
    
    const SortByTime = Git.Revwalk.SORT.TIME;
    const history = (commit.history as Function)(SortByTime);

    return new Promise<ParsedHistoryCommit[]>(resolve => {
        const commits: ParsedHistoryCommit[] = [];

        history.on('commit', async (commit: Git.Commit) => {
            commits.push(await parseCommit(commit, branchName!));
        });
    
        (history as EventEmitter).on('end', () => {
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