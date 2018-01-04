import { ParsedHistoryCommit, UnreleasedCommitMessages, UnreleasedChangelogCommit } from './types';
import { Store } from './store';

/** works like in Array.filter(callback) */
export type FilterT = (c: ParsedHistoryCommit) => false|UnreleasedCommitMessages;

/**
 * filter out commits  
 * * `parsedCommits` - from git/parse function
 * * `filter` - filter out commits and pick categorised messages
 * * `onlyMarked` - pick commits only with `commitToUnreleasedChangelog=true` (all by default)
 */
export async function filterParsedCommits(store: Store, parsedCommits: ParsedHistoryCommit[], filter: FilterT, onlyMarked?: false|'onlyMarked'): Promise<UnreleasedChangelogCommit[]> {
    const commits: UnreleasedChangelogCommit[] = parsedCommits.map(pc => {
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

    // filter out mapped
    store.data.parsedHistory = store.data.parsedHistory.filter(x => commits.find(y => y.commitHash === x.commitHash) === null);
    store.data.unreleasedChangelog.push(...commits);
    await store.autoSave();

    return commits;
}