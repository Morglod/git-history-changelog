"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const Git = require("nodegit");
exports.blankConfig = {
    repository: './',
    trackedBranches: {},
    parsedHistory: [],
    unreleasedChangelog: [],
    changelog: [],
    messageCategories: {}
};
class Store {
    constructor() {
        this.filename = './git-history-changelog.json';
        this.data = Object.assign({}, exports.blankConfig);
        this.autosave = false;
    }
    async clearChangelog() {
        this.data.changelog = [];
        await this.autoSave();
        return;
    }
    async save() {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.filename, JSON.stringify(this.data, null, 2), (err) => {
                if (err)
                    reject(err);
                else
                    resolve(true);
            });
        });
    }
    async autoSave() {
        if (!this.autosave)
            return true;
        return this.save();
    }
    static async openOrCreate(filename, repository, autoSave) {
        const file = path.resolve(filename);
        const fileContent = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : JSON.stringify(exports.blankConfig, null, 2);
        const data = JSON.parse(fileContent);
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
exports.Store = Store;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLCtCQUErQjtBQUlsQixRQUFBLFdBQVcsR0FBbUI7SUFDdkMsVUFBVSxFQUFFLElBQUk7SUFDaEIsZUFBZSxFQUFFLEVBQUU7SUFDbkIsYUFBYSxFQUFFLEVBQUU7SUFDakIsbUJBQW1CLEVBQUUsRUFBRTtJQUN2QixTQUFTLEVBQUUsRUFBRTtJQUNiLGlCQUFpQixFQUFFLEVBQUU7Q0FDeEIsQ0FBQztBQUVGO0lBQUE7UUFDSSxhQUFRLEdBQVcsOEJBQThCLENBQUE7UUFFakQsU0FBSSxxQkFBd0IsbUJBQVcsRUFBRTtRQUN6QyxhQUFRLEdBQVksS0FBSyxDQUFDO0lBc0M5QixDQUFDO0lBcENHLEtBQUssQ0FBQyxjQUFjO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUN6QixNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0QixNQUFNLENBQUM7SUFDWCxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUk7UUFDTixNQUFNLENBQUMsSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDekMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDcEUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDO29CQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckIsSUFBSTtvQkFBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUTtRQUNWLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBZ0IsRUFBRSxVQUFrQixFQUFFLFFBQTJCO1FBQ3ZGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0csTUFBTSxJQUFJLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFckQsTUFBTSxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVuRCxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzFCLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUNuQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsS0FBSyxVQUFVLENBQUM7UUFFekMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0o7QUExQ0Qsc0JBMENDIn0=