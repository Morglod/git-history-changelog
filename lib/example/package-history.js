"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ghc = require("../index");
const fs = require("fs");
async function main() {
    const store = await ghc.Store.openOrCreate('./changelog.json', './', 'autosave');
    const parsedCommits = await ghc.parseUntrackedCommits(store);
    const formatted = await ghc.formatParsedCommits(store, parsedCommits, async (x) => {
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
    const formated2 = await Promise.all(formatted.map(async (f) => {
        const packageFile = await ghc.fileContentString(store, f.commitHash, 'package.json');
        const packageVersion = JSON.parse(packageFile).version;
        return Object.assign({}, f, { messages: {
                [packageVersion]: f.messages
            } });
    }));
    const grouped = await ghc.reduceUnreleasedCommits(store, formated2);
    const grouped2 = grouped.map(g => (Object.assign({}, g, { messages: ghc.groupEveryKeyByKeys(g.messages) })));
    const changelog = await ghc.toChangelog(store, grouped2);
    const rendered = store.data.changelog.sort((a, b) => b.datetimeUTC - a.datetimeUTC).map(entry => join_markdown([
        `Branch: ${entry.branchName}, ${new Date(entry.datetimeUTC * 1000).toLocaleString()}`,
        '',
        Object.entries(entry.messages).map(([packageVersion, categorized]) => [
            `# ${packageVersion}`,
            Object.entries(categorized).map(([category, messages]) => [
                `## ${category}`,
                messages.map(message => `* ${message}`)
            ]),
            ''
        ])
    ])).join('  \n---  \n');
    fs.writeFile('./changelog.md', rendered, 'utf8', err => {
        if (err)
            console.error(err);
        else
            console.log('ok');
    });
}
main();
function join_markdown(x) {
    if (Array.isArray(x)) {
        return x.map(join_markdown).join('  \n');
    }
    return x;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZS1oaXN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V4YW1wbGUvcGFja2FnZS1oaXN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0NBQWdDO0FBQ2hDLHlCQUF5QjtBQUV6QixLQUFLO0lBQ0QsTUFBTSxLQUFLLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDakYsTUFBTSxhQUFhLEdBQUcsTUFBTSxHQUFHLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0QsTUFBTSxTQUFTLEdBQUcsTUFBTSxHQUFHLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDOUUsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDekQsTUFBTSxXQUFXLEdBQW9DLEVBQUUsQ0FBQztRQUN4RCxNQUFNLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFFOUIsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUUsUUFBUSxFQUFFLElBQUksQ0FBRSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsZUFBZSxFQUFFLEdBQUcsQ0FBRSxDQUFDO1lBQ3pGLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLENBQUM7Z0JBQzNCLFdBQVcsQ0FBQyxRQUFR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