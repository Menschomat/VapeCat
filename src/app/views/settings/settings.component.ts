import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Aroma, Producer } from '../..//model/model';
import { DatabaseService } from '../..//services/database.service';
import { Connection, getConnection, getRepository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewProducerComponent } from './components/new-producer/new-producer.component';
import { NewAromaComponent } from './components/new-aroma/new-aroma.component';
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
  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.updateProducers();
  }
  close() {
    this.router.navigateByUrl("/home")
  }
  openProducerDialog(): void {
    const dialogRef = this.dialog.open(NewProducerComponent, {
      width: '20rem'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.addNewProducer(result)
    });
  }
  openAromaDialog(): void {
    const dialogRef = this.dialog.open(NewAromaComponent, {
      width: '20rem',
      data: this.producers
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.addNewAroma(result.name,result.mix,result.producer)
    });
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
