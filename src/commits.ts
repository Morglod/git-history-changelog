import { ParsedHistoryCommit, UnreleasedCommitMessages, UnreleasedChangelogCommit } from './types';
import { Store } from './store';
import { groupByKeys } from './utils';

/** works like in Array.filter(callback) */
export type FormatFunc<UnreleasedCommitMessagesT = UnreleasedCommitMessages> = (c: ParsedHistoryCommit) => (false|UnreleasedCommitMessagesT)|Promise<false|UnreleasedCommitMessagesT>;

/**
 * format commits  
 * * `parsedCommits` - from git/parse function
 * * `filter` - filter out commits and pick categorised messages
 * * `onlyMarked` - pick commits only with `commitToUnreleasedChangelog=true` (all by default)
 */
export async function formatParsedCommits<UnreleasedCommitMessagesT = UnreleasedCommitMessages>(
    store: Store,
    parsedCommits: ParsedHistoryCommit[],
    format: FormatFunc<UnreleasedCommitMessagesT>,
    onlyMarked?: false|'onlyMarked'
): Promise<UnreleasedChangelogCommit<UnreleasedCommitMessagesT>[]> {
    const commits: UnreleasedChangelogCommit<UnreleasedCommitMessagesT>[] = (await Promise.all(parsedCommits.map(async pc => {
        if (onlyMarked && !pc.commitToUnreleasedChangelog) return false;
        const messages = await format(pc);
        if (messages === false) return false;
        return ({
            authorName: pc.authorName,
            datetimeUTC: pc.datetimeUTC,
            branchName: pc.branchName,
            commitHash: pc.commitHash,
            messages
        }) as UnreleasedChangelogCommit<UnreleasedCommitMessagesT>;
    }))).filter(x => x !== false) as any;

    // filter out mapped
    store.data.parsedHistory = store.data.parsedHistory.filter(x => commits.find(y => y.commitHash === x.commitHash) === null);
    store.data.unreleasedChangelog.push(...commits);
    await store.autoSave();

    return commits;
}

export async function reduceUnreleasedCommits<MessageT = any>(
    store: Store,
    unreleasedCommits: UnreleasedChangelogCommit<UnreleasedCommitMessages<MessageT>>[]
) {
    const branchNames = new Set<string>();
    unreleasedCommits.forEach(x => branchNames.add(x.branchName));

    const grouped = Array.from(branchNames).map(branchName => {
        const groupedByBranch = unreleasedCommits.filter(c => c.branchName === branchName);
        const sortedByDate = groupedByBranch.sort((a, b) => b.datetimeUTC - a.datetimeUTC);
        const lastCommit = sortedByDate[0];

        const messagesGroupedByCategory: { [categoryName: string]: any[] } = groupByKeys(sortedByDate.map(x => x.messages));

        return {
            ...lastCommit,
            messages: messagesGroupedByCategory
        };
    });

    
    // filter out mapped
    store.data.unreleasedChangelog = store.data.unreleasedChangelog.filter(x => unreleasedCommits.find(y => y.commitHash === x.commitHash) === null);
    store.data.unreleasedChangelog.push(...grouped);
    await store.autoSave();

    return grouped;
}
