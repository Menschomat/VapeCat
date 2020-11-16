import { Injectable } from '@angular/core';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { ElectronService } from '../electron/electron.service';
import { Producer } from '../model/model';
import { Settings } from './settings/settings';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public connection: Promise<Connection>;
  private readonly options: ConnectionOptions;
  constructor(private electron: ElectronService) {
    Settings.initialize(electron.remote);
    this.options = {
      type: 'sqlite',
      database: Settings.dbPath,
      entities: [Producer],
      synchronize: true,
      logging: 'all',
    };
    this.connection = createConnection(this.options);
  }
}
