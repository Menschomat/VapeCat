import { Injectable, OnDestroy } from '@angular/core';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { ElectronService } from '../electron/electron.service';
import { Aroma, AromaBottle, Producer } from '../model/model';
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
      entities: [Producer, Aroma, AromaBottle],
      synchronize: true,
      logging: 'all',
      logger:'simple-console'
    };
    this.connection = createConnection(this.options);
  }
  
  insertProducer(name: string) {

    this.connection.then(c => {
  
      c.createQueryBuilder()
        .insert()
        .into(Producer)
        .values({
          name: name
        })
        .execute();
    });
  }
}
