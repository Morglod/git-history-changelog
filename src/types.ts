export type ParsedHistoryCommit = {
    authorName: string,
    datetimeUTC: number,
    branchName: string,
    commitHash: string,
    message: string,
    files: string[],
    commitToUnreleasedChangelog: boolean
}

export type UnreleasedCommitMessages<MessageT = any> = {
    [categoryName: string]: MessageT
}

export type UnreleasedChangelogCommit<UnreleasedCommitMessagesT = UnreleasedCommitMessages> = {
    authorName: string,
    datetimeUTC: number,
    branchName: string,
    commitHash: string,
    messages: UnreleasedCommitMessagesT
}

export type ChangelogMessages<MessageT = any> = {
    [categoryName: string]: MessageT
};

export type ChangelogEntry<ChangelogMessagesT = ChangelogMessages> = {
    datetimeUTC: number,
    branchName: string,
    messages: ChangelogMessagesT
}

export type TrackedBranches = {
    [branchName: string]: {
        lastCommitDateTimeUTC: number,
        lastCommitHash: string
    }
}

export type GitHistoryType = {
    /** path to repository */
    repository: string,
    trackedBranches: TrackedBranches,
    parsedHistory: ParsedHistoryCommit[],
    unreleasedChangelog: UnreleasedChangelogCommit[],
    changelog: ChangelogEntry[],
    messageCategories: {
        [categoryName: string]: {
            // some options will be
        }
    }
}