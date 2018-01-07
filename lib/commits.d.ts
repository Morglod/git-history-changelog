import { ParsedHistoryCommit, UnreleasedCommitMessages, UnreleasedChangelogCommit } from './types';
import { Store } from './store';
/** works like in Array.filter(callback) */
export declare type FormatFunc<UnreleasedCommitMessagesT = UnreleasedCommitMessages> = (c: ParsedHistoryCommit) => (false | UnreleasedCommitMessagesT) | Promise<false | UnreleasedCommitMessagesT>;
/**
 * format commits
 * * `parsedCommits` - from git/parse function
 * * `filter` - filter out commits and pick categorised messages
 * * `onlyMarked` - pick commits only with `commitToUnreleasedChangelog=true` (all by default)
 */
export declare function formatParsedCommits<UnreleasedCommitMessagesT = UnreleasedCommitMessages>(store: Store, parsedCommits: ParsedHistoryCommit[], format: FormatFunc<UnreleasedCommitMessagesT>, onlyMarked?: false | 'onlyMarked'): Promise<UnreleasedChangelogCommit<UnreleasedCommitMessagesT>[]>;
export declare function reduceUnreleasedCommits<MessageT = any>(store: Store, unreleasedCommits: UnreleasedChangelogCommit<UnreleasedCommitMessages<MessageT>>[]): Promise<{
    messages: {
        [categoryName: string]: any[];
    };
    authorName: string;
    datetimeUTC: number;
    branchName: string;
    commitHash: string;
}[]>;
