import * as ghc from '../index';
import * as fs from 'fs';

async function main() {
    const store = await ghc.Store.openOrCreate('./changelog.json', 'autosave');
    const parsedCommits = await ghc.parseUntrackedCommits(store, { path: './' });
    const filtered = await ghc.filterParsedCommits(store, parsedCommits, (x) => {
        const messages = x.message.split(';').map(y => y.trim());
        const categorized: ghc.ChangelogMessages = {};
        const defaultCategory = 'log';

        for (const msg of messages) {
            const [ category, text ] = msg.includes(':') ? msg.split(':') : [ defaultCategory, msg ];
            if (!(category in categorized))
                categorized[category] = [];
            categorized[category].push(text.trim());
        }

        return categorized;
    });
    const changelog = await ghc.toChangelog(store, filtered);
    const rendered = ghc.renderChangelog(store, {
        entries: changelog,
        categories: 'all',
    });

    fs.writeFile('./changelog.md', rendered, 'utf8', err => {
        if (err) console.error(err);
        else console.log('ok');
    });
}

main();