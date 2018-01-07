# git-history-changelog

Framework for writing changelog generation tools based on git history.

Uses [nodegit](http://www.nodegit.org/).

* Split commit messages to custom categories.
* By default all stages autosaves in local config (check Store object).
* You can provide your render and formatting methods.
* Framework care and track branches.

Please [contact me](mailto:morglod@gmail.com?Subject=npm%20git%20history%20changelog) if you use this library in your projects or for support and proposals.

## [Example result](src/example/package-history.ts)
```md
Branch: refs/heads/master, 2018-1-7 06:00:38  
  
# 0.1.0  
## example  
* package-history added  
## critical  
* Store now handles Git.Repository instance  
* openOrCreate now with repository path argument  
* filterParsedCommits renamed to formatParsedCommits  
## log  
* custom message types now passing through mapping/formatting methods  
## new  
* reduceUnreleasedCommits, groupEveryKeyByKeys methods added  
# 0.0.3  
## log  
* link fixed in readme  
* repo updated  
# 0.0.1  
## dev  
* readme added  
* example with categories  
## bugfix  
* second parse error fixed
```

## [Simple use](src/example/example.ts)

* 1. Pick untracked commits
* 2. Format commit messages from '{messageCategory}: message;'
* 3. Accept all filtered and mapped commits
* 4. Render all categories with default simple markdown renderer

```ts
const store = await Store.openOrCreate('./changelog.json', './', 'autosave');

// 1. Pick untracked commits
const parsedCommits = await parseUntrackedCommits(store);

// 2. Format commit messages from '{messageCategory}: message;'
const formatted = await formatParsedCommits(store, parsedCommits, (x) => {
    const messages = x.message.split(';').map(y => y.trim());
    const categorized: ChangelogMessages<string[]> = {};
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
const changelog = await toChangelog(store, formatted);

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
# example  
* package-history added  
# critical  
* Store now handles Git.Repository instance  
* openOrCreate now with repository path argument  
* filterParsedCommits renamed to formatParsedCommits  
# log  
* custom message types now passing through mapping/formatting methods  
```

## Future plans

* git tags extraction
* more examples
* ui

## Api

### [Store](src/store.ts)

Cache control object. Provide simple methods for saving and loading config.

Fields:
* `filename` - absolute path to config
* `data` - config, typeof [GitHistoryType](src/types.ts)
* `autosave` - flag, if true, framework will save config after every step
* `repo` - NodeGit.Repository instance

Methods:
* `static async openOrCreate(filename, repositoryPath, autoSave: false|'autosave'): Store` - open or create config and open repository
* `async clearChangelog()` - clear changelog (from last step)
* `async save(): true` - save config to `filename`

### [git](src/git.ts)

This methods care about git commits, branches etc.

```ts
async function parseUntrackedCommits(store: Store, {
    branchName?: string,
    onlyLastCommit?: boolean
}): ParsedHistoryCommit[]
```

Parse untracked commits with specified options.  
Returns new parsed commits.

* `branchName` - target git branch, (current by default)
* `onlyLastCommit` - track only last commit, skip others (track all by default)

```ts
async function fileContentBlob(
    store: Store,
    commitHash: string,
    filePath: string
): NodeGit.Blob

async function fileContentBuffer(
    store: Store,
    commitHash: string,
    filePath: string
): Buffer

async function fileContentString(
    store: Store,
    commitHash: string,
    filePath: string
): string
```

Read file by it's path from specified commit.  
* `filePath` - relative to repository root (eg 'package.json')

### [commits](src/commits.ts)

This methods care about commits filtering and messages extraction.

```ts
async function formatParsedCommits(
    store: Store,
    parsedCommits: ParsedHistoryCommit[],
    format: FormatFunc,
    onlyMarked?: false|'onlyMarked'
): UnreleasedChangelogCommit[]
```

Format & filter commit messages.

* `parsedCommits` - commits that will be formatted & filtered.
* `format` - filtering and extraction method (check [example](src/example/example.ts)).
* `onlyMarked: false|'onlyMarked'` - pick commits only with `commitToUnreleasedChangelog=true` (all by default)

```ts
async function reduceUnreleasedCommits(
    store: Store,
    unreleasedCommits: UnreleasedChangelogCommit[]
): UnreleasedChangelogCommit[]
```

Pick last commit for each listed branch,  
take all messages to last commit,  
group all messages by categories.

For better example, check [package-history example](src/example/package-history.ts).

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

Renders changelog entries with specified renderers.  
By default it uses simple markdown renderers (check [source code](src/changelog.ts)).

Better use custom rendering method (check [package-history example](src/example/package-history.ts)).

### [utils](src/utils.ts)

```ts
function groupByKeys<T>(items: { [keyName: string]: T }[] )
    : { [keyName: string]: T[] };
```

Group every item's values by it's keys.  
Example:
```ts
groupByKeys([ { a: 1 }, { a: 2 } ]) -> { a: [ 1, 2 ] }
```

```ts
function groupEveryKeyByKeys<T>(
    item: { [keyA: string]: { [keyB: string]: T }<T>[] }
):
    { [keyA: string]: { [keyB: string]: T[] } }
```

Example:
```ts
groupEveryKeyByKeys({ x: [ { a: 1 }, { a: 2 } ] }) -> { x: { a: [ 1, 2 ] } }
```
