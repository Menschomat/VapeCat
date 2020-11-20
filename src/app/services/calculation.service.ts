import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AromaBottle } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  public readonly calculate: Subject<AromaBottle> = new Subject()
  constructor() { }
}
