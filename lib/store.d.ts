import * as Git from 'nodegit';
import { GitHistoryType } from './types';
export declare const blankConfig: GitHistoryType;
export declare class Store {
    filename: string;
    repo: Git.Repository;
    data: GitHistoryType;
    autosave: boolean;
    clearChangelog(): Promise<void>;
    save(): Promise<true>;
    autoSave(): Promise<true>;
    static openOrCreate(filename: string, repository: string, autoSave?: false | 'autosave'): Promise<Store>;
}
