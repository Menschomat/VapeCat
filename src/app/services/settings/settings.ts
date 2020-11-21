import { isDevMode } from '@angular/core';
import * as path from 'path';

export class Settings {

    public static dbFolder: string;
    public static dbPath: string;
    public static appPath: string;
    private static dataSubFolder: string;
    private static dbName = 'database.db';

    public static initialize(remote): void {
        Settings.getPaths(remote);
    }

    private static getPaths(remote) {
        if (isDevMode()) {
            this.dbName = 'dev-database.db'
        }
        this.dataSubFolder = '/';
        Settings.appPath = remote.app.getPath('userData');

        Settings.dbFolder = path.join(Settings.appPath, Settings.dataSubFolder);
        Settings.dbPath = path.join(Settings.dbFolder, this.dbName)
    }
}
