import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Aroma, Producer } from '../..//model/model';
import { getConnection, getRepository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewProducerComponent } from './components/new-producer/new-producer.component';
import { NewAromaComponent } from './components/new-aroma/new-aroma.component';
import { ThisReceiver } from '@angular/compiler';
import { DatabaseService } from '../../services/database.service';
import { SettingsService } from '../../services/settings.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  faTimes = faTimes;
  faPlus = faPlus;
  faTrash = faTrash;
  producers: Producer[];
  aromas: Aroma[];
  producerRelated: number[];
  aromaRelated: number[];
  aromaCols: string[] = ['name', 'aromaPercent', 'producer', 'delete'];
  producerCols: string[] = ['name', 'delete'];
  constructor(private dialog: MatDialog, private router: Router, private db: DatabaseService) { }

  ngOnInit(): void {
    this.db.getProducerRelated.subscribe(nums => this.producerRelated = nums);
    this.db.getAromas.subscribe(aromas => this.aromas = aromas);
    this.db.getProducers.subscribe(producers => this.producers = producers);
    this.db.getAromasRelated.subscribe(rel => this.aromaRelated = rel);
    this.db.updateAromas();
    this.db.updateProducers();
    this.db.updateAromaBottles();

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
        this.db.addNewProducer(result)
    });
  }
  openAromaDialog(): void {
    const dialogRef = this.dialog.open(NewAromaComponent, {
      width: '20rem',
      data: this.producers
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.db.addNewAroma(result.name, result.mix, result.producer)
    });
  }

  deleteAroma(id: number) {
    this.db.deleteAroma(id);
  }
  deleteProducter(id: number) {
    this.db.deleteProducter(id);
  }



}
