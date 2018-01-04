export type ParsedHistoryCommit = {
    authorName: string,
    datetimeUTC: number,
    branchName: string,
    commitHash: string,
    message: string,
    files: string[],
    commitToUnreleasedChangelog: boolean
}

export type UnreleasedCommitMessages = {
    [categoryName: string]: string[]
}

export type UnreleasedChangelogCommit = {
    authorName: string,
    datetimeUTC: number,
    branchName: string,
    commitHash: string,
    messages: UnreleasedCommitMessages
}

export type ChangelogMessages = {
    [categoryName: string]: string[]
};

export type ChangelogEntry = {
    datetimeUTC: number,
    branchName: string,
    messages: ChangelogMessages
}

export type TrackedBranches = {
    [branchName: string]: {
        lastCommitDateTimeUTC: number,
        lastCommitHash: string
    }
}

export type GitHistoryType = {
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