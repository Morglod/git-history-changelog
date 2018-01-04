import { UnreleasedChangelogCommit, ChangelogEntry } from './types';

export function toChangelog(commits: UnreleasedChangelogCommit[]): ChangelogEntry[] {
    return commits.map(c => ({
        datetimeUTC: c.datetimeUTC,
        branchName: c.branchName,
        messages: c.messages
    }));
}

export type RenderChangelogMessageFunc = (category: string, message: string) => string

export type RenderedMessages = { [categoryName: string]: string[] };
export type RenderChangelogFunc = (messages: RenderedMessages) => string

export function buildChangelog({
    entries,
    categories,
    messageRenderer = renderChangelogMessage,
    changelogRenderer = renderChangelogMessages
}: {
    entries: ChangelogEntry[],
    categories: 'all'|string[],
    messageRenderer?: RenderChangelogMessageFunc,
    changelogRenderer?: RenderChangelogFunc
}): string {
    const rendered: { [categoryName: string]: string[] } = {};
    for(const entry of entries) {
        for(const [ category, message ] of Object.entries(entry.messages)) {
            if (categories === 'all' || categories.includes(category)) {
                const renderedMsg = messageRenderer(category, message);
                if (!rendered[category]) rendered[category] = [];
                rendered[category].push(renderedMsg);
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