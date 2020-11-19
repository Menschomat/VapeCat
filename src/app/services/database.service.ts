import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Connection, ConnectionOptions, createConnection, getConnection, getRepository } from 'typeorm';
import { ElectronService } from '../electron/electron.service';
import { Aroma, AromaBottle, Producer } from '../model/model';
import { Settings } from './settings/settings';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private producers: Subject<Producer[]> = new Subject();
  private aromas: Subject<Aroma[]> = new Subject();
  private producerRelated: Subject<number[]> = new Subject();
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
      logger: 'simple-console'
    };
    this.connection = createConnection(this.options);
    this.connection.then(() => {
      this.updateProducers();
      this.updateAromas();
    })
  }
  get getProducers(): Observable<Producer[]> {
    return this.producers;
  }
  get getAromas(): Observable<Aroma[]> {
    return this.aromas;
  }
  get getProducerRelated(): Subject<number[]> {
    return this.producerRelated;
  }
  addNewProducer(name: string) {
    getConnection().createQueryBuilder()
      .insert()
      .into(Producer)
      .values({
        name: name
      })
      .execute().then(() => this.updateProducers());
  }
  addNewAroma(name: string, mix: number, producer: Producer) {
    getConnection().createQueryBuilder()
      .insert()
      .into(Aroma)
      .values({
        name: name,
        aromaPercent: mix,
        producer: producer
      })
      .execute().then(() => this.updateAromas());
  }
  deleteAroma(id: number) {
    getConnection()
      .createQueryBuilder()
      .delete()
      .from(Aroma)
      .where("id = :id", { id: id })
      .execute().then(() => this.updateAromas());;
  }
  deleteProducter(id: number) {
    getConnection()
      .createQueryBuilder()
      .delete()
      .from(Producer)
      .where("id = :id", { id: id })
      .execute().then(() => this.updateProducers());;
  }
  updateProducers(): void {
    getRepository(Producer)
      .createQueryBuilder("producer")
      .getMany().then(pro => {
        this.producers.next(pro);
      });
  }
  updateAromas(): void {
    getRepository(Aroma).find({ relations: ["producer"] }).then(ars => { this.aromas.next(ars); this.checkRelationForProducer(ars); });

  }
  checkRelationForProducer(ars: Aroma[]) {
    this.aromas.subscribe(aromas => {
      this.producerRelated.next(Array.from(new Set(aromas.map(arom => arom.producer.id))));
    })
  }

}
