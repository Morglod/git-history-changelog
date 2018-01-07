import { UnreleasedChangelogCommit, UnreleasedCommitMessages, ChangelogMessages, ChangelogEntry } from './types';
import { Store } from './store';
export declare function toChangelog<MessagesT = string[]>(store: Store, commits: UnreleasedChangelogCommit<UnreleasedCommitMessages<MessagesT>>[]): Promise<ChangelogEntry<ChangelogMessages<MessagesT>>[]>;
export declare type RenderChangelogMessageFunc = (category: string, message: string) => string;
export declare type RenderedMessages = {
    [categoryName: string]: string[];
};
export declare type RenderChangelogFunc = (messages: RenderedMessages) => string;
export declare function renderChangelog(store: Store, {entries, categories, messageRenderer, changelogRenderer}: {
    entries: ChangelogEntry<ChangelogMessages<string[]>>[];
    categories: 'all' | string[];
    messageRenderer?: RenderChangelogMessageFunc;
    changelogRenderer?: RenderChangelogFunc;
}): string;
export declare function renderChangelogMessage(category: string, message: string): string;
export declare function renderChangelogMessages(messages: RenderedMessages): string;
