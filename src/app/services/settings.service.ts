import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { Bottle, NicotinBottle, Settings } from '../model/model';
import * as path from 'path';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settingsFile: string;
  public settings: Settings;
  constructor(private electron: ElectronService) {
    let dataSubFolder = '/';
    let userData = electron.remote.app.getPath('userData');
    let settingsFolder = path.join(userData, dataSubFolder);
    this.settingsFile = path.join(settingsFolder, 'settings.json')
    if (!this.electron.fs.existsSync(this.settingsFile)) {
      this.electron.fs.writeFileSync(this.settingsFile, JSON.stringify({
        nicotinStrength: 0,
        defaultBottleSize: 100,
        defaultBase: {
          price: 0,
          size: 1000
        } as Bottle,
        defaultShot: {
          price: 0,
          nicotinLevel: 0,
          size: 0
        } as NicotinBottle
      } as Settings))
    }
    let rawJson = this.electron.fs.readFileSync(this.settingsFile, 'utf-8');
    this.settings = JSON.parse(rawJson);
  }
  public save() {
    console.log(this.settings);

    this.electron.fs.writeFileSync(this.settingsFile, JSON.stringify(this.settings));
  }

}
