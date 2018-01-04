# git-history-changelog

Framework for writing changelog generation tools based on git history.

Uses [nodegit](http://www.nodegit.org/).

* Split commit messages to custom categories.
* By default all stages autosaves in local config (check Store object).
* You can provide your render and filtering methods.
* Framework care and track braches.

## [Example](src/example/example.ts)

* 1. Pick untracked commits
* 2. Format commit messages from '{messageCategory}: message;'
* 3. Accept all filtered and mapped commits
* 4. Render all categories with default simple markdown renderer

```ts
const store = await Store.openOrCreate('./changelog.json', 'autosave');

// 1. Pick untracked commits
const parsedCommits = await parseUntrackedCommits(store, { path: './' });

// 2. Format commit messages from '{messageCategory}: message;'
const filtered = await filterParsedCommits(store, parsedCommits, (x) => {
    const messages = x.message.split(';').map(y => y.trim());
    const categorized: ChangelogMessages = {};
    const defaultCategory = 'log';

    for (const msg of messages) {
        const [ category, text ] = msg.includes(':') ? msg.split(':') : [ defaultCategory, msg ];
        if (!(category in categorized))
            categorized[category] = [];
        categorized[category].push(text.trim());
    }

    return categorized;
});

// 3. Accept all filtered and mapped commits
const changelog = await toChangelog(store, filtered);

// 4. Render all categories with default simple markdown renderer
const rendered = renderChangelog(store, {
    entries: changelog,
    categories: 'all',
});

fs.writeFile('./changelog.md', rendered, 'utf8', err => {
    if (err) console.error(err);
    else console.log('ok');
});
```

Result for this repo:

```md
# bugfix  
* second parse error fixed  
# dev  
* example with categories  
# log  
* some fixes  
* example works  
* store added  
* wip on example
```

## Api

### [Store](src/store.ts)

Cache control object. Provide simple methods for saving and loading config.

Fields:
* `filename` - absolute path to config
* `data` - config, typeof [GitHistoryType](src/types.ts)
* `autosave` - flag, if true, framework will save config after every step

Methods:
* `static async openOrCreate(filename, autoSave: false|'autosave'): Store` - open or create config
* `async clearChangelog()` - clear changelog (from last step)
* `async save(): true` - save config to `filename`

### [git](src/git.ts)

This methods care about git commits, branches etc.

```ts
async function parseUntrackedCommits(store: Store, {
    path?: string,
    branchName?: string,
    onlyLastCommit?: boolean
}): ParsedHistoryCommit[]
```

Parse untracked commits with specified options.  
Returns new parsed commits.

* `path` - git repository path, (local by default)
* `branchName` - target git branch, (current by default)
* `onlyLastCommit` - track only last commit, skip others (track all by default)

### [commits](src/commits.ts)

This methods care about commits filtering and messages extraction.

```ts
async function filterParsedCommits(
    store: Store,
    parsedCommits: ParsedHistoryCommit[],
    filter: FilterT,
    onlyMarked?: false|'onlyMarked'
): UnreleasedChangelogCommit[]
```

Filter commits, split commit message parts to categories.

* `parsedCommits` - commits that will be filtered.
* `filter` - filtering and extraction method (check [example](src/example.ts)).
* `onlyMarked: false|'onlyMarked'` - pick commits only with `commitToUnreleasedChangelog=true` (all by default)

### [changelog](src/changelog.ts)

This methods care about changelog entries and rendering.

```ts
async function toChangelog(
    store: Store,
    commits: UnreleasedChangelogCommit[]
): ChangelogEntry[]
```

Fixes specified commits as changelog entries.

```ts
async function renderChangelog(store: Store, {
    entries: ChangelogEntry[],
    categories: 'all'|string[],
    messageRenderer?: RenderChangelogMessageFunc,
    changelogRenderer?: RenderChangelogFunc
}): string
```

Renders changelog entries with specifiend renderers.  
By default it uses simple markdown renderers (check [source code](src/changelog.ts)).