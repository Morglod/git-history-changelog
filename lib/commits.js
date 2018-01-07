"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
/**
 * format commits
 * * `parsedCommits` - from git/parse function
 * * `filter` - filter out commits and pick categorised messages
 * * `onlyMarked` - pick commits only with `commitToUnreleasedChangelog=true` (all by default)
 */
async function formatParsedCommits(store, parsedCommits, format, onlyMarked) {
    const commits = (await Promise.all(parsedCommits.map(async (pc) => {
        if (onlyMarked && !pc.commitToUnreleasedChangelog)
            return false;
        const messages = await format(pc);
        if (messages === false)
            return false;
        return ({
            authorName: pc.authorName,
            datetimeUTC: pc.datetimeUTC,
            branchName: pc.branchName,
            commitHash: pc.commitHash,
            messages
        });
    }))).filter(x => x !== false);
    // filter out mapped
    store.data.parsedHistory = store.data.parsedHistory.filter(x => commits.find(y => y.commitHash === x.commitHash) === null);
    store.data.unreleasedChangelog.push(...commits);
    await store.autoSave();
    return commits;
}
exports.formatParsedCommits = formatParsedCommits;
async function reduceUnreleasedCommits(store, unreleasedCommits) {
    const branchNames = new Set();
    unreleasedCommits.forEach(x => branchNames.add(x.branchName));
    const grouped = Array.from(branchNames).map(branchName => {
        const groupedByBranch = unreleasedCommits.filter(c => c.branchName === branchName);
        const sortedByDate = groupedByBranch.sort((a, b) => b.datetimeUTC - a.datetimeUTC);
        const lastCommit = sortedByDate[0];
        const messagesGroupedByCategory = utils_1.groupByKeys(sortedByDate.map(x => x.messages));
        return Object.assign({}, lastCommit, { messages: messagesGroupedByCategory });
    });
    // filter out mapped
    store.data.unreleasedChangelog = store.data.unreleasedChangelog.filter(x => unreleasedCommits.find(y => y.commitHash === x.commitHash) === null);
    store.data.unreleasedChangelog.push(...grouped);
    await store.autoSave();
    return grouped;
}
exports.reduceUnreleasedCommits = reduceUnreleasedCommits;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWl0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21taXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsbUNBQXNDO0FBS3RDOzs7OztHQUtHO0FBQ0ksS0FBSyw4QkFDUixLQUFZLEVBQ1osYUFBb0MsRUFDcEMsTUFBNkMsRUFDN0MsVUFBK0I7SUFFL0IsTUFBTSxPQUFPLEdBQTJELENBQUMsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxFQUFFO1FBQ3BILEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDaEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEMsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQztZQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDckMsTUFBTSxDQUFDLENBQUM7WUFDSixVQUFVLEVBQUUsRUFBRSxDQUFDLFVBQVU7WUFDekIsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXO1lBQzNCLFVBQVUsRUFBRSxFQUFFLENBQUMsVUFBVTtZQUN6QixVQUFVLEVBQUUsRUFBRSxDQUFDLFVBQVU7WUFDekIsUUFBUTtTQUNYLENBQXlELENBQUM7SUFDL0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQVEsQ0FBQztJQUVyQyxvQkFBb0I7SUFDcEIsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQzNILEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7SUFDaEQsTUFBTSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBekJELGtEQXlCQztBQUVNLEtBQUssa0NBQ1IsS0FBWSxFQUNaLGlCQUFrRjtJQUVsRixNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO0lBQ3RDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFFOUQsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDckQsTUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FBQztRQUNuRixNQUFNLFlBQVksR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkYsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5DLE1BQU0seUJBQXlCLEdBQXNDLG1CQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRXBILE1BQU0sbUJBQ0MsVUFBVSxJQUNiLFFBQVEsRUFBRSx5QkFBeUIsSUFDckM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUdILG9CQUFvQjtJQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7SUFDakosS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUNoRCxNQUFNLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUV2QixNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ25CLENBQUM7QUEzQkQsMERBMkJDIn0=