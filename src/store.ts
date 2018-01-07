import * as fs from 'fs';
import * as path from 'path';
import * as Git from 'nodegit';

import { GitHistoryType } from './types';

export const blankConfig: GitHistoryType = {
    repository: './',
    trackedBranches: {},
    parsedHistory: [],
    unreleasedChangelog: [],
    changelog: [],
    messageCategories: {}
};

export class Store {
    filename: string = './git-history-changelog.json'
    repo: Git.Repository;
    data: GitHistoryType = { ...blankConfig }
    autosave: boolean = false;

    async clearChangelog() {
        this.data.changelog = [];
        await this.autoSave();
        return;
    }

    async save(): Promise<true> {
        return new Promise<true>((resolve, reject) => {
            fs.writeFile(this.filename, JSON.stringify(this.data, null, 2), (err) => {
                if (err) reject(err);
                else resolve(true);
            })
        })
    }

    async autoSave(): Promise<true> {
        if (!this.autosave) return true;
        return this.save();
    }

    static async openOrCreate(filename: string, repository: string, autoSave?: false|'autosave'): Promise<Store> {
        const file = path.resolve(filename);
        const fileContent = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : JSON.stringify(blankConfig, null, 2);
        const data: GitHistoryType = JSON.parse(fileContent);

        const repo = await Git.Repository.open(repository);

        const store = new Store();
        store.filename = file;
        store.data = data;
        store.data.repository = repository;
        store.repo = repo;
        store.autosave = autoSave === 'autosave';

        return store;
    }
}