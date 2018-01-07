import { UnreleasedChangelogCommit, UnreleasedCommitMessages, ChangelogMessages, ChangelogEntry } from './types';
import { Store } from './store';

export async function toChangelog<MessagesT = string[]>(store: Store, commits: UnreleasedChangelogCommit<UnreleasedCommitMessages<MessagesT>>[]): Promise<ChangelogEntry<ChangelogMessages<MessagesT>>[]> {
    const mapped: ChangelogEntry<ChangelogMessages<MessagesT>>[] = commits.map(c => ({
        datetimeUTC: c.datetimeUTC,
        branchName: c.branchName,
        messages: c.messages
    }));

    store.data.unreleasedChangelog = store.data.unreleasedChangelog.filter(x => commits.find(y => y.commitHash === x.commitHash) === null);
    store.data.changelog.push(...mapped);
    await store.autoSave();

    return mapped;
}

export type RenderChangelogMessageFunc = (category: string, message: string) => string

export type RenderedMessages = { [categoryName: string]: string[] };
export type RenderChangelogFunc = (messages: RenderedMessages) => string

export function renderChangelog(store: Store, {
    entries,
    categories,
    messageRenderer = renderChangelogMessage,
    changelogRenderer = renderChangelogMessages
}: {
    entries: ChangelogEntry<ChangelogMessages<string[]>>[],
    categories: 'all'|string[],
    messageRenderer?: RenderChangelogMessageFunc,
    changelogRenderer?: RenderChangelogFunc
}): string {
    const rendered: { [categoryName: string]: string[] } = {};
    for(const entry of entries) {
        for(const [ category, messages ] of Object.entries(entry.messages)) {
            if (categories === 'all' || categories.includes(category)) {
                if (messages.length !== 0 && !rendered[category]) rendered[category] = [];
                for (const message of messages) {
                    const renderedMsg = messageRenderer(category, message);
                    rendered[category].push(renderedMsg);
                }
            }
        }
    }
    return changelogRenderer(rendered);
}

export function renderChangelogMessage(category: string, message: string): string {
    return `* ${message}`;
}

export function renderChangelogMessages(messages: RenderedMessages): string {
    return Object.entries(messages).map(([ category, renderedMessage ]) => {
        return [ `# ${category}`, renderedMessage.join('  \n') ].join('  \n');
    }).join('  \n');
}
