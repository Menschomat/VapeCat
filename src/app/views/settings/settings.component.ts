import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Aroma, Producer } from '../..//model/model';
import { DatabaseService } from '../..//services/database.service';
import { Connection, getConnection, getRepository } from 'typeorm';
import { from, Observable } from 'rxjs';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  faTimes = faTimes;
  faPlus = faPlus;
  faTrash = faTrash;
  producers: Observable<Producer[]>
  aromas: Observable<Aroma[]>
  producerCols: string[] = ['id', 'name', 'delete'];
  constructor(private db: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    this.updateProducers();
  }
  close() {
    this.router.navigateByUrl("/home")
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

  deleteProducter(id: number) {
    getConnection()
      .createQueryBuilder()
      .delete()
      .from(Producer)
      .where("id = :id", { id: id })
      .execute().then(() => this.updateProducers());;
  }
  updateProducers(): void {
    this.producers = from(getRepository(Producer)
      .createQueryBuilder("producer")
      .getMany());
  }
  updateAromas(): void {
    this.aromas = from(getRepository(Aroma)
      .createQueryBuilder("aroma")
      .getMany());
  }

}
