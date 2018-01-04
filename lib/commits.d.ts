import { ParsedHistoryCommit, UnreleasedCommitMessages, UnreleasedChangelogCommit } from './types';
import { Store } from './store';
/** works like in Array.filter(callback) */
export declare type FilterT = (c: ParsedHistoryCommit) => false | UnreleasedCommitMessages;
/**
 * filter out commits
 * * `parsedCommits` - from git/parse function
 * * `filter` - filter out commits and pick categorised messages
 * * `onlyMarked` - pick commits only with `commitToUnreleasedChangelog=true` (all by default)
 */
export declare function filterParsedCommits(store: Store, parsedCommits: ParsedHistoryCommit[], filter: FilterT, onlyMarked?: false | 'onlyMarked'): Promise<UnreleasedChangelogCommit[]>;
