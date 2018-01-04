import { GitHistoryType } from './types';
export declare const blankConfig: GitHistoryType;
export declare class Store {
    filename: string;
    data: GitHistoryType;
    autosave: boolean;
    save(): Promise<true>;
    autoSave(): Promise<true>;
    static openOrCreate(filename: string, autoSave?: false | 'autosave'): Promise<Store>;
}