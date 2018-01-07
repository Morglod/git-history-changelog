/// <reference types="node" />
import * as Git from 'nodegit';
import { ParsedHistoryCommit } from './types';
import { Store } from './store';
/**
 * Parse untracked commits
 * * `branchName` - target branch name; will be used current by default
 * * `trackedBranches` - if not privded, all commits will be parsed
 * * `onlyLastCommit` - pick only last (top) commit
 */
export declare function parseUntrackedCommits(store: Store, {branchName, onlyLastCommit}?: {
    branchName?: string;
    onlyLastCommit?: boolean;
}): Promise<ParsedHistoryCommit[]>;
export declare function parseCommit(commit: Git.Commit, branchName: string): Promise<ParsedHistoryCommit>;
export declare function listCommitFiles(commit: Git.Commit): Promise<string[]>;
export declare function fileContentBlob(store: Store, commitHash: string, filePath: string): Promise<Git.Blob>;
export declare function fileContentBuffer(store: Store, commitHash: string, filePath: string): Promise<Buffer>;
export declare function fileContentString(store: Store, commitHash: string, filePath: string): Promise<string>;
