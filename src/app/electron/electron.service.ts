import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  public platforms = {
    WINDOWS: 'WINDOWS',
    MAC: 'MAC',
    LINUX: 'LINUX',
    SUN: 'SUN',
    OPENBSD: 'OPENBSD',
    ANDROID: 'ANDROID',
    AIX: 'AIX',
  };
  platformsNames = {
    win32: this.platforms.WINDOWS,
    darwin: this.platforms.MAC,
    linux: this.platforms.LINUX,
    sunos: this.platforms.SUN,
    openbsd: this.platforms.OPENBSD,
    android: this.platforms.ANDROID,
    aix: this.platforms.AIX,
  };
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  os: any;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }
  get platform(): string {
    return this.platformsNames[this.os.platform()];
  }
  quit() {
    var window = this.remote.getCurrentWindow();
    window.close();
  }
  maximize() {
    var window = this.remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  }
  minimize() {
    var window = this.remote.getCurrentWindow();
    window.minimize();
  }
  constructor() {

    this.ipcRenderer = window.require('electron').ipcRenderer;
    this.webFrame = window.require('electron').webFrame;

    //If you wan to use remote object, pleanse set enableRemoteModule to true in main.ts
    this.remote = window.require('electron').remote;

    this.childProcess = window.require('child_process');
    this.fs = window.require('fs');
    this.os = window.require('os');



  }
}