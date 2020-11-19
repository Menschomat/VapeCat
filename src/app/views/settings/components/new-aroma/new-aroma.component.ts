import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Producer } from '../../../../model/model';

@Component({
  selector: 'app-new-aroma',
  templateUrl: './new-aroma.component.html',
  styleUrls: ['./new-aroma.component.scss']
})
export class NewAromaComponent implements OnInit {
  result: { name: string, mix: number, producer: Producer } = {} as { name: string, mix: number, producer: Producer };
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<NewAromaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Observable<Producer[]>,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required,]],
      mix: [null, [Validators.required,]],
      producer: [null, Validators.required],
    });
  }
  onSubmit(data:{ name: string, mix: number, producer: Producer }){
    this.dialogRef.close(data);
  }

}
