import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { from, Observable } from 'rxjs';
import { getRepository } from 'typeorm';
import { AromaBottle } from '../../model/model';
@Component({
  selector: 'app-aroma-manager',
  templateUrl: './aroma-manager.component.html',
  styleUrls: ['./aroma-manager.component.scss']
})
export class AromaManagerComponent implements OnInit {
  displayedColumns: string[] = ['liquid', 'size', 'level', 'mixing', 'price', 'price_per_hun', 'delete'];
  faTrash = faTrash;
  @Input()
  bottles: AromaBottle[];
  @Output()
  delete = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

}
