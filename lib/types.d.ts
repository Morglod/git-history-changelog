export declare type ParsedHistoryCommit = {
    authorName: string;
    datetimeUTC: number;
    branchName: string;
    commitHash: string;
    message: string;
    files: string[];
    commitToUnreleasedChangelog: boolean;
};
export declare type UnreleasedCommitMessages<MessageT = any> = {
    [categoryName: string]: MessageT;
};
export declare type UnreleasedChangelogCommit<UnreleasedCommitMessagesT = UnreleasedCommitMessages> = {
    authorName: string;
    datetimeUTC: number;
    branchName: string;
    commitHash: string;
    messages: UnreleasedCommitMessagesT;
};
export declare type ChangelogMessages<MessageT = any> = {
    [categoryName: string]: MessageT;
};
export declare type ChangelogEntry<ChangelogMessagesT = ChangelogMessages> = {
    datetimeUTC: number;
    branchName: string;
    messages: ChangelogMessagesT;
};
export declare type TrackedBranches = {
    [branchName: string]: {
        lastCommitDateTimeUTC: number;
        lastCommitHash: string;
    };
};
export declare type GitHistoryType = {
    /** path to repository */
    repository: string;
    trackedBranches: TrackedBranches;
    parsedHistory: ParsedHistoryCommit[];
    unreleasedChangelog: UnreleasedChangelogCommit[];
    changelog: ChangelogEntry[];
    messageCategories: {
        [categoryName: string]: {};
    };
};
