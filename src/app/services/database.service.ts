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
  private aromaBottles: Subject<AromaBottle[]> = new Subject();
  private producerRelated: Subject<number[]> = new Subject();
  private aromasRelated: Subject<number[]> = new Subject();

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
  get getProducerRelated(): Subject<number[]> {
    return this.producerRelated;
  }
  get getAromas(): Observable<Aroma[]> {
    return this.aromas;
  }
  get getAromasRelated(): Subject<number[]> {
    return this.aromasRelated;
  }
  get getAromaBottles(): Observable<AromaBottle[]> {
    return this.aromaBottles;
  }

  addNewProducer(name: string) {
    this.connection.then(c => {
      c.createQueryBuilder()
        .insert()
        .into(Producer)
        .values({
          name: name
        })
        .execute().then(() => this.updateProducers());
    });
  }
  addNewAroma(name: string, mix: number, producer: Producer) {
    this.connection.then(c => {
      c.createQueryBuilder()
        .insert()
        .into(Aroma)
        .values({
          name: name,
          aromaPercent: mix,
          producer: producer
        })
        .execute().then(() => this.updateAromas());
    });
  }
  addNewAromaBottle(price: number, liquidLevel: number, bottleSize: number, aroma: Aroma) {
    this.connection.then(c => {
      c.createQueryBuilder()
        .insert()
        .into(AromaBottle)
        .values({
          price, liquidLevel, bottleSize, aroma
        })
        .execute().then(() => this.updateAromaBottles());
    });
  }
  deleteAromaBottle(id: number) {
    this.connection.then(c => {
      c.createQueryBuilder()
        .delete()
        .from(AromaBottle)
        .where("id = :id", { id: id })
        .execute().then(() => this.updateAromaBottles());
    });
  }
  deleteAroma(id: number) {
    this.connection.then(c => {
      c.createQueryBuilder()
        .delete()
        .from(Aroma)
        .where("id = :id", { id: id })
        .execute().then(() => this.updateAromas());
    });
  }
  deleteProducter(id: number) {
    this.connection.then(c => {
      c.createQueryBuilder()
        .delete()
        .from(Producer)
        .where("id = :id", { id: id })
        .execute().then(() => this.updateProducers());
    });
  }
  updateProducers(): void {
    this.connection.then(c => {
      c.getRepository(Producer)
        .createQueryBuilder("producer")
        .getMany().then(pro => {
          this.producers.next(pro);
        });
    })
  }
  updateAromaBottles(): void {
    this.connection.then(c => {
      c.getRepository(AromaBottle)
        .find({
          join: {
            alias: "aroma_bottle",
            leftJoinAndSelect: {
              "aroma": "aroma_bottle.aroma",
              "producer": "aroma.producer"
            }
          }
        })
        .then(ars => {
          this.aromaBottles.next(ars);
          this.checkRelationForAromas(ars);
        });
    });
  }
  updateAromas(): void {
    this.connection.then(c => {
      c.getRepository(Aroma)
        .find({ relations: ["producer"] })
        .then(ars => {
          this.aromas.next(ars);
          this.checkRelationForProducer(ars);
        });
    });
  }
  checkRelationForProducer(ars: Aroma[]) {
    this.producerRelated.next(Array.from(new Set(ars.map(arom => arom.producer.id))));
  }
  checkRelationForAromas(ars: AromaBottle[]) {
    this.aromasRelated.next(Array.from(new Set(ars.map(arom => arom.aroma.id))));
  }

}
