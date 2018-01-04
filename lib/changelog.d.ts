import { UnreleasedChangelogCommit, ChangelogEntry } from './types';
import { Store } from './store';
export declare function toChangelog(store: Store, commits: UnreleasedChangelogCommit[]): Promise<ChangelogEntry[]>;
export declare type RenderChangelogMessageFunc = (category: string, message: string) => string;
export declare type RenderedMessages = {
    [categoryName: string]: string[];
};
export declare type RenderChangelogFunc = (messages: RenderedMessages) => string;
export declare function renderChangelog({entries, categories, messageRenderer, changelogRenderer}: {
    entries: ChangelogEntry[];
    categories: 'all' | string[];
    messageRenderer?: RenderChangelogMessageFunc;
    changelogRenderer?: RenderChangelogFunc;
}): string;
export declare function renderChangelogMessage(category: string, message: string): string;
export declare function renderChangelogMessages(messages: RenderedMessages): string;
