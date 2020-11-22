import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AromaBottle, Bottle } from '../../model/model';
import { CalculationService } from '../../services/calculation.service'
import { SettingsService } from '../../services/settings.service';
import { LiquidRecipe, LiquidUtils, RecipeInput } from '../../utils/LiquidUtils';
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
  reciept: LiquidRecipe;
  currentBottles: AromaBottle[];

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
    this.reciept = this.currentBottles ?
      LiquidUtils.generateReciepe({
        amount: this.bottleSize,
        aromaBottles: this.currentBottles,
        aromaPercent: this.aromaPercent,
        base: this.settings.settings.defaultBase,
        nicotinYield: this.liquidStrength,
        shot: this.settings.settings.defaultShot
      } as RecipeInput) :
      LiquidUtils.generateReciepe({
        amount: this.bottleSize,
        aromaPercent: this.aromaPercent,
        base: this.settings.settings.defaultBase,
        nicotinYield: this.liquidStrength,
        shot: this.settings.settings.defaultShot
      } as RecipeInput);

    this.renderer.setStyle(this.baseEl.nativeElement, "height", `${this.reciept.base / (this.bottleSize / 100)}%`);
    if (this.reciept.shot)
      this.renderer.setStyle(this.nicotinEl.nativeElement, "height", `${this.reciept.shot / (this.bottleSize / 100)}%`);
    else
      this.renderer.setStyle(this.nicotinEl.nativeElement, "height", `0%`);
    this.renderer.setStyle(this.aromaEl.nativeElement, "height", `${this.reciept.aroma / (this.bottleSize / 100)}%`);
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
    if (this.reciept?.aromabottles && this.bootlesLevel >= this.reciept?.aromabottles.reduce((sum: number, a) => sum + a.amount, 0)) {
      this.reciept.aromabottles.forEach(b => {
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



}
