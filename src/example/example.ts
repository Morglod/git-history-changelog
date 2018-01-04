import * as ghc from '../index';
import * as fs from 'fs';

async function main() {
    const store = await ghc.Store.openOrCreate('./changelog.json', 'autosave');
    const parsedCommits = await ghc.parseUntrackedCommits(store, { path: './' });
    const filtered = await ghc.filterParsedCommits(store, parsedCommits, (x) => {
        return {
            'log': x.message.split(';').map(y => y.trim())
        }
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