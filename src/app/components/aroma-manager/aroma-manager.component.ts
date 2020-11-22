import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFlask, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AromaBottle } from '../../model/model';
import { LiquidUtils } from '../../utils/LiquidUtils';
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
    this.calc.calculate.next(this.bottles.filter(b => b.aroma.id === bottle.aroma.id));
  }
  resetCalc() {
    this.calc.calculate.next(undefined);
  }
  calculatePricePerDefault(bottle: AromaBottle) {
    const bottle_size = this.settings.settings.defaultBottleSize;
    const base = this.settings.settings.defaultBase;
    const shot = this.settings.settings.defaultShot;
    const reciepe = LiquidUtils.generateReciepe({
      amount: bottle_size,
      aromaBottles: [bottle],
      base: base,
      nicotinYield: this.settings.settings.nicotinStrength,
      shot: shot
    });

    return reciepe.price;
  }
  get bottleSize(): number {
    return this.settings.settings.defaultBottleSize;
  }
  get tableContent(): { bottles: AromaBottle[] }[] {
    return null;
  }

}
