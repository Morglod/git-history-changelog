"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ghc = require("../index");
const fs = require("fs");
async function main() {
    const store = await ghc.Store.openOrCreate('./changelog.json', './', 'autosave');
    const parsedCommits = await ghc.parseUntrackedCommits(store);
    const formatted = await ghc.formatParsedCommits(store, parsedCommits, (x) => {
        const messages = x.message.split(';').map(y => y.trim());
        const categorized = {};
        const defaultCategory = 'log';
        for (const msg of messages) {
            const [category, text] = msg.includes(':') ? msg.split(':') : [defaultCategory, msg];
            if (!(category in categorized))
                categorized[category] = [];
            categorized[category].push(text.trim());
        }
        return categorized;
    });
    const changelog = await ghc.toChangelog(store, formatted);
    const rendered = ghc.renderChangelog(store, {
        entries: changelog,
        categories: 'all',
    });
    fs.writeFile('./changelog.md', rendered, 'utf8', err => {
        if (err)
            console.error(err);
        else
            console.log('ok');
    });
}
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlL2V4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnQ0FBZ0M7QUFDaEMseUJBQXlCO0FBRXpCLEtBQUs7SUFDRCxNQUFNLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqRixNQUFNLGFBQWEsR0FBRyxNQUFNLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3RCxNQUFNLFNBQVMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDeEUsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDekQsTUFBTSxXQUFXLEdBQW9DLEVBQUUsQ0FBQztRQUN4RCxNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFFOUIsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUUsUUFBUSxFQUFFLElBQUksQ0FBRSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsZUFBZSxFQUFFLEdBQUcsQ0FBRSxDQUFDO1lBQ3pGLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLENBQUM7Z0JBQzNCLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDL0IsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sU0FBUyxHQUFHLE1BQU0sR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDMUQsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUU7UUFDeEMsT0FBTyxFQUFFLFNBQVM7UUFDbEIsVUFBVSxFQUFFLEtBQUs7S0FDcEIsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSTtZQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsSUFBSSxFQUFFLENBQUMifQ==