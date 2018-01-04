export declare type ParsedHistoryCommit = {
    authorName: string;
    datetimeUTC: number;
    branchName: string;
    commitHash: string;
    message: string;
    files: string[];
    commitToUnreleasedChangelog: boolean;
};
export declare type UnreleasedCommitMessages = {
    [categoryName: string]: string[];
};
export declare type UnreleasedChangelogCommit = {
    authorName: string;
    datetimeUTC: number;
    branchName: string;
    commitHash: string;
    messages: UnreleasedCommitMessages;
};
export declare type ChangelogMessages = {
    [categoryName: string]: string[];
};
export declare type ChangelogEntry = {
    datetimeUTC: number;
    branchName: string;
    messages: ChangelogMessages;
};
export declare type TrackedBranches = {
    [branchName: string]: {
        lastCommitDateTimeUTC: number;
        lastCommitHash: string;
    };
};
export declare type GitHistoryType = {
    trackedBranches: TrackedBranches;
    parsedHistory: ParsedHistoryCommit[];
    unreleasedChangelog: UnreleasedChangelogCommit[];
    changelog: ChangelogEntry[];
    messageCategories: {
        [categoryName: string]: {};
    };
};
