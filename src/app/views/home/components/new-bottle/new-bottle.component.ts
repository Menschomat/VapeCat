import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aroma, AromaBottle } from '../../../../model/model';

@Component({
  selector: 'app-new-bottle',
  templateUrl: './new-bottle.component.html',
  styleUrls: ['./new-bottle.component.scss']
})
export class NewBottleComponent implements OnInit {
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<NewBottleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Aroma[],
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      price: [null, [Validators.required,]],
      bottleSize: [null, [Validators.required,]],
      liquidLevel: [null, [Validators.required,]],
      aroma: [null, Validators.required],
    });
  }
  onSubmit(data: AromaBottle) {
    this.dialogRef.close(data);
  }
}
