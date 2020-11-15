import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

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
  bottleSize = 100;
  aromaPercent = 5;
  shotStrength = 20;
  liquidStrength = 0;
  liquidMix: LiquidMix;

  @ViewChild('bottle') bottleEl: ElementRef;
  @ViewChild('base') baseEl: ElementRef;
  @ViewChild('aroma') aromaEl: ElementRef;
  @ViewChild('nicotin') nicotinEl: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
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

}
