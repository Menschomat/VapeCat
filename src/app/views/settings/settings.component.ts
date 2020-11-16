import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  faTimes = faTimes;
  constructor(public dialogRef: MatDialogRef<SettingsComponent>,) { }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }

}
