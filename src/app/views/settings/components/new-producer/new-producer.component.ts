import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-producer',
  templateUrl: './new-producer.component.html',
  styleUrls: ['./new-producer.component.scss']
})
export class NewProducerComponent implements OnInit {
  name:string;
  constructor(public dialogRef: MatDialogRef<NewProducerComponent>) { }

  ngOnInit(): void {
  }

}
