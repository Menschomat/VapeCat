import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { getRepository } from 'typeorm';
import { AromaBottle } from '../../model/model';
@Component({
  selector: 'app-aroma-manager',
  templateUrl: './aroma-manager.component.html',
  styleUrls: ['./aroma-manager.component.scss']
})
export class AromaManagerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'liquid', 'mixing', 'price'];
  aromaBottles: Observable<AromaBottle[]>;
  constructor() { }

  ngOnInit(): void {
    this.updateAromaBottles();
  }
  updateAromaBottles() {
    this.aromaBottles = from(getRepository(AromaBottle)
      .createQueryBuilder("aroma_bottle")
      .getMany());
  }
}
