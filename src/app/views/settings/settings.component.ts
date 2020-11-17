import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Producer } from 'src/app/model/model';
import { DatabaseService } from 'src/app/services/database.service';
import { Connection, getRepository } from 'typeorm';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  faTimes = faTimes;
  connection: Connection;
  producers: Promise<Producer[]>;
  constructor(private db: DatabaseService, public dialogRef: MatDialogRef<SettingsComponent>,) { }

  ngOnInit(): void {
    this.updateProducers();
  }
  close() {
    this.db.connection.then(c => {
      c.createQueryBuilder()
        .insert()
        .into(Producer)
        .values({
          name: "Inavera"
        })
        .execute();
      this.connection = c;

    });
    this.dialogRef.close();
  }
  updateProducers(): void {
    this.producers = getRepository(Producer)
      .createQueryBuilder("producer")
      .getMany();
  }

}
