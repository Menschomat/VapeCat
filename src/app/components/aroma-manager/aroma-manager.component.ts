import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFlag, faFlask, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AromaBottle, Settings } from '../../model/model';
import { SettingsService } from '../../services/settings.service';
import { CalculationService } from '../../services/calculation.service';
@Component({
  selector: 'app-aroma-manager',
  templateUrl: './aroma-manager.component.html',
  styleUrls: ['./aroma-manager.component.scss']
})
export class AromaManagerComponent implements OnInit {

  displayedColumns: string[] = ['liquid', 'size', 'level', 'mixing', 'price', 'price_per_hun', 'calc', 'delete'];
  faTrash = faTrash;
  faFlask = faFlask;

  @Input()
  bottles: AromaBottle[];
  @Output()
  delete = new EventEmitter<number>();

  constructor(private settings: SettingsService, private calc: CalculationService) { }

  ngOnInit(): void {
  }
  calcLqiuid(bottle: AromaBottle) {
    this.calc.calculate.next(bottle);
  }
  calculatePricePerDefault(bottle: AromaBottle) {
    const aroma_percent = bottle.aroma.aromaPercent;
    const bottle_size = this.settings.settings.defaultBottleSize;
    const base = this.settings.settings.defaultBase;
    const shot = this.settings.settings.defaultShot;
    const aroma_price_per_ml = bottle.price / bottle.size;
    const aroma_ml = (bottle_size / 100 * aroma_percent);
    const aroma_price = aroma_ml * aroma_price_per_ml;
    let shot_price = 0
    let shot_ml = 0
    if (shot.nicotinLevel > 0 && this.settings.settings.nicotinStrength > 0 && shot.size > 0) {
      shot_ml = bottle_size / (shot.nicotinLevel / this.settings.settings.nicotinStrength);
      shot_price = (shot.price / shot.size) * shot_ml;
    }
    const base_ml = bottle_size - shot_ml - aroma_ml;
    const base_price = (base.price / base.size) * base_ml;

    return aroma_price + shot_price + base_price;
  }
  get bottleSize(): number {
    return this.settings.settings.defaultBottleSize;
  }

}
