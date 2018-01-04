import * as Git from 'nodegit';
import { ParsedHistoryCommit } from './types';
import { Store } from './store';
/**
 * Parse untracked commits
 * * `path` - absolute path to repository
 * * `branchName` - target branch name; will be used current by default
 * * `trackedBranches` - if not privded, all commits will be parsed
 * * `onlyLastCommit` - pick only last (top) commit
 */
export declare function parseUntrackedCommits(store: Store, {path, branchName, onlyLastCommit}: {
    path?: string;
    branchName?: string;
    onlyLastCommit?: boolean;
}): Promise<ParsedHistoryCommit[]>;
export declare function parseCommit(commit: Git.Commit, branchName: string): Promise<ParsedHistoryCommit>;
export declare function listCommitFiles(commit: Git.Commit): Promise<string[]>;
