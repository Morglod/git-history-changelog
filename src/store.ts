import * as fs from 'fs';
import * as path from 'path';

import { GitHistoryType } from './types';

export const blankConfig: GitHistoryType = {
    trackedBranches: {},
    parsedHistory: [],
    unreleasedChangelog: [],
    changelog: [],
    messageCategories: {}
};

export class Store {
    filename: string = './git-history-changelog.json'
    data: GitHistoryType = { ...blankConfig }
    autosave: boolean = false;

    async clearChangelog() {
        this.data.changelog = [];
        await this.autoSave();
        return;
    }

    async save(): Promise<true> {
        return new Promise<true>((resolve, reject) => {
            fs.writeFile(this.filename, JSON.stringify(this.data), (err) => {
                if (err) reject(err);
                else resolve(true);
            })
        })
    }

    async autoSave(): Promise<true> {
        if (!this.autosave) return true;
        return this.save();
    }

    static async openOrCreate(filename: string, autoSave?: false|'autosave'): Promise<Store> {
        const file = path.resolve(filename);
        const fileContent = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : JSON.stringify(blankConfig);
        const data: GitHistoryType = JSON.parse(fileContent);

        const store = new Store();
        store.filename = file;
        store.data = data;
        store.autosave = autoSave === 'autosave';

        return store;
    }
}