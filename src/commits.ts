import { ParsedHistoryCommit, UnreleasedCommitMessages, UnreleasedChangelogCommit } from './types';

/** works like in Array.filter(callback) */
export type FilterT = (c: ParsedHistoryCommit) => false|UnreleasedCommitMessages;

/**
 * filter out commits  
 * * `parsedCommits` - from git/parse function
 * * `filter` - filter out commits and pick categorised messages
 * * `onlyMarked` - pick commits only with `commitToUnreleasedChangelog=true` (all by default)
 */
export function filterCommits(parsedCommits: ParsedHistoryCommit[], filter: FilterT, onlyMarked?: false|'onlyMarked'): UnreleasedChangelogCommit[] {
    return parsedCommits.map(pc => {
        if (onlyMarked && !pc.commitToUnreleasedChangelog) return false;
        const messages = filter(pc);
        if (messages === false) return false;
        return ({
            authorName: pc.authorName,
            datetimeUTC: pc.datetimeUTC,
            branchName: pc.branchName,
            commitHash: pc.commitHash,
            messages
        }) as UnreleasedChangelogCommit;
    }).filter(x => x !== false) as any;
}