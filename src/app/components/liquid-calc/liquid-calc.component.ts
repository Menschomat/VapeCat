import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AromaBottle } from '../../model/model';
import { CalculationService } from '../../services/calculation.service'
import { SettingsService } from '../../services/settings.service';
interface LiquidMix {
  nicotin: number;
  aroma: number;
  base: number;
}
@Component({
  selector: 'app-liquid-calc',
  templateUrl: './liquid-calc.component.html',
  styleUrls: ['./liquid-calc.component.scss']
})
export class LiquidCalcComponent implements AfterViewInit {
  faTimes = faTimes
  bottleSize = 100;
  aromaPercent = 5;
  shotStrength = 20;
  liquidStrength = 0;
  liquidMix: LiquidMix;
  currentBottles: AromaBottle[];
  bottleUsage: { id: number, amount: number, price: number }[] = [];
  price: number;

  @Output()
  updateAroma = new EventEmitter<AromaBottle>();

  @ViewChild('bottle') bottleEl: ElementRef;
  @ViewChild('base') baseEl: ElementRef;
  @ViewChild('aroma') aromaEl: ElementRef;
  @ViewChild('nicotin') nicotinEl: ElementRef;


  constructor(private renderer: Renderer2, private calc: CalculationService, private settings: SettingsService) { }

  ngOnInit(): void {
    this.calc.calculate.subscribe(res => {
      if (res && res.length > 0) {
        this.bottleSize = this.settings.settings.defaultBottleSize;
        this.aromaPercent = res[0].aroma.aromaPercent;
        this.shotStrength = this.settings.settings.defaultShot.nicotinLevel ? this.settings.settings.defaultShot.nicotinLevel : 0;
        this.liquidStrength = this.settings.settings.nicotinStrength ? this.settings.settings.nicotinStrength : 0;
        this.currentBottles = res;
        this.updateLiquid();
      }
      else {
        this.currentBottles = undefined;
      }
    })
  }
  ngAfterViewInit(): void {
    this.updateLiquid();

  }
  updateLiquid() {
    this.liquidMix = this.calculateLiquid(
      this.aromaPercent,
      this.bottleSize,
      this.shotStrength,
      this.liquidStrength
    );
    this.renderer.setStyle(this.baseEl.nativeElement, "height", `${this.liquidMix.base / (this.bottleSize / 100)}%`);
    if (this.liquidMix.nicotin)
      this.renderer.setStyle(this.nicotinEl.nativeElement, "height", `${this.liquidMix.nicotin / (this.bottleSize / 100)}%`);
    else
      this.renderer.setStyle(this.nicotinEl.nativeElement, "height", `0%`);
    this.renderer.setStyle(this.aromaEl.nativeElement, "height", `${this.liquidMix.aroma / (this.bottleSize / 100)}%`);
    if (this.currentBottles && this.currentBottles.length > 0) {
      this.bottleUsage = this.calcMix();
      this.price = this.calcAromaPrice() +
        this.settings.settings.defaultBase.price / this.settings.settings.defaultBase.size * this.liquidMix.base;
      if (this.settings.settings.defaultShot?.price && this.settings.settings.defaultShot?.size) {
        this.price += this.settings.settings.defaultShot?.price / this.settings.settings.defaultShot?.size * this.liquidMix.nicotin;
      }
    }
  }
  calculateLiquid(aromaPercent: number, bottleSize: number, shotStrength?: number, liquidStrength?: number): LiquidMix {
    const out = {} as LiquidMix;
    out.aroma = bottleSize / 100 * aromaPercent;
    out.base = bottleSize - out.aroma;
    if (shotStrength && liquidStrength) {
      out.nicotin = bottleSize / (shotStrength / liquidStrength)
      out.base -= out.nicotin;
    }
    return out;
  }
  mixeIt() {
    if (this.bootlesLevel >= this.liquidMix?.aroma) {
      this.bottleUsage.forEach(b => {
        const bottle = this.currentBottles.find(bottle => bottle.id === b.id)
        bottle.level -= b.amount;
        this.updateAroma.emit(bottle);
      })
    }


  }
  get bootlesLevel(): number {
    let out = 0;
    this.currentBottles.forEach(b => out += b.level)
    return out;
  }

  calcMix(): { id: number, amount: number, price: number }[] {
    const out: { id: number, amount: number, price: number }[] = [];
    if (this.bootlesLevel >= this.liquidMix?.aroma) {
      this.currentBottles.sort((a, b) => (a.level > b.level) ? 1 : -1);
      let toSubs = this.liquidMix.aroma;
      this.currentBottles.forEach(
        bottle => {
          if (bottle.level >= toSubs) {
            out.push({
              id: bottle.id,
              amount: toSubs,
              price: bottle.price / bottle.size * toSubs

            });
            toSubs = 0;
          } else {
            out.push({
              id: bottle.id,
              amount: bottle.level,
              price: bottle.price / bottle.size * bottle.level
            })
            toSubs -= bottle.level;
          }
          this.updateAroma.emit(bottle);
        }
      );
    }
    return out;
  }
  calcAromaPrice(): number {
    return this.bottleUsage.reduce((sum: number, b: { id: number, amount: number, price: number }) => sum + b.price, 0);
  }

}
