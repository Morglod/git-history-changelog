"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function toChangelog(store, commits) {
    const mapped = commits.map(c => ({
        datetimeUTC: c.datetimeUTC,
        branchName: c.branchName,
        messages: c.messages
    }));
    store.data.unreleasedChangelog = store.data.unreleasedChangelog.filter(x => commits.find(y => y.commitHash === x.commitHash) === null);
    store.data.changelog.push(...mapped);
    await store.autoSave();
    return mapped;
}
exports.toChangelog = toChangelog;
function renderChangelog(store, { entries, categories, messageRenderer = renderChangelogMessage, changelogRenderer = renderChangelogMessages }) {
    const rendered = {};
    for (const entry of entries) {
        for (const [category, messages] of Object.entries(entry.messages)) {
            if (categories === 'all' || categories.includes(category)) {
                if (messages.length !== 0 && !rendered[category])
                    rendered[category] = [];
                for (const message of messages) {
                    const renderedMsg = messageRenderer(category, message);
                    rendered[category].push(renderedMsg);
                }
            }
        }
    }
    return changelogRenderer(rendered);
}
exports.renderChangelog = renderChangelog;
function renderChangelogMessage(category, message) {
    return `* ${message}`;
}
exports.renderChangelogMessage = renderChangelogMessage;
function renderChangelogMessages(messages) {
    return Object.entries(messages).map(([category, renderedMessage]) => {
        return [`# ${category}`, renderedMessage.join('  \n')].join('  \n');
    }).join('  \n');
}
exports.renderChangelogMessages = renderChangelogMessages;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NoYW5nZWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdPLEtBQUssc0JBQTRDLEtBQVksRUFBRSxPQUF5RTtJQUMzSSxNQUFNLE1BQU0sR0FBbUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0UsV0FBVyxFQUFFLENBQUMsQ0FBQyxXQUFXO1FBQzFCLFVBQVUsRUFBRSxDQUFDLENBQUMsVUFBVTtRQUN4QixRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVE7S0FDdkIsQ0FBQyxDQUFDLENBQUM7SUFFSixLQUFLLENBQUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0lBQ3ZJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRXZCLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQVpELGtDQVlDO0FBT0QseUJBQWdDLEtBQVksRUFBRSxFQUMxQyxPQUFPLEVBQ1AsVUFBVSxFQUNWLGVBQWUsR0FBRyxzQkFBc0IsRUFDeEMsaUJBQWlCLEdBQUcsdUJBQXVCLEVBTTlDO0lBQ0csTUFBTSxRQUFRLEdBQXlDLEVBQUUsQ0FBQztJQUMxRCxHQUFHLENBQUEsQ0FBQyxNQUFNLEtBQUssSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLEdBQUcsQ0FBQSxDQUFDLE1BQU0sQ0FBRSxRQUFRLEVBQUUsUUFBUSxDQUFFLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxLQUFLLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQzFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sT0FBTyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLE1BQU0sV0FBVyxHQUFHLGVBQWUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQ3ZELFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3pDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFDRCxNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQXhCRCwwQ0F3QkM7QUFFRCxnQ0FBdUMsUUFBZ0IsRUFBRSxPQUFlO0lBQ3BFLE1BQU0sQ0FBQyxLQUFLLE9BQU8sRUFBRSxDQUFDO0FBQzFCLENBQUM7QUFGRCx3REFFQztBQUVELGlDQUF3QyxRQUEwQjtJQUM5RCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFFLFFBQVEsRUFBRSxlQUFlLENBQUUsRUFBRSxFQUFFO1FBQ2xFLE1BQU0sQ0FBQyxDQUFFLEtBQUssUUFBUSxFQUFFLEVBQUUsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUpELDBEQUlDIn0=