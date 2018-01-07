import * as ghc from '../index';
import * as fs from 'fs';

async function main() {
    const store = await ghc.Store.openOrCreate('./changelog.json', './', 'autosave');
    const parsedCommits = await ghc.parseUntrackedCommits(store);
    const formatted = await ghc.formatParsedCommits(store, parsedCommits, async (x) => {
        const messages = x.message.split(';').map(y => y.trim());
        const categorized: ghc.ChangelogMessages<string[]> = {};
        const defaultCategory = 'log';

        for (const msg of messages) {
            const [ category, text ] = msg.includes(':') ? msg.split(':') : [ defaultCategory, msg ];
            if (!(category in categorized))
                categorized[category] = [];
            categorized[category].push(text.trim());
        }

        return categorized;
    });

    const formated2 = await Promise.all(formatted.map(async f => {
        const packageFile = await ghc.fileContentString(store, f.commitHash, 'package.json');
        const packageVersion: string = JSON.parse(packageFile).version;
        return {
            ...f,
            messages: {
                [packageVersion]: f.messages
            }
        }
    }));

    const grouped = await ghc.reduceUnreleasedCommits(store, formated2);
    const grouped2 = grouped.map(g => ({
        ...g,
        messages: ghc.groupEveryKeyByKeys(g.messages)
    }));
    const changelog = await ghc.toChangelog(store, grouped2);

    const rendered = (store.data.changelog as typeof changelog).sort((a, b) => b.datetimeUTC - a.datetimeUTC).map(entry => join_markdown([
        `Branch: ${entry.branchName}, ${new Date(entry.datetimeUTC * 1000).toLocaleString()}`,
        '',
        Object.entries(entry.messages).map(([ packageVersion, categorized ]) => [
            `# ${packageVersion}`,
            Object.entries(categorized).map(([ category, messages ]) => [
                `## ${category}`,
                messages.map(message => `* ${message}`)
            ])
        ])
    ])).join('  \n---  \n');

    fs.writeFile('./changelog.md', rendered, 'utf8', err => {
        if (err) console.error(err);
        else console.log('ok');
    });
}

main();

function join_markdown(x: any): string {
    if (Array.isArray(x)) {
        return x.map(join_markdown).join('  \n');
    }
    return x;
}