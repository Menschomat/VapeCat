import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faCog, faFlask, faPlus, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Aroma, AromaBottle } from '../../model/model';
import { DatabaseService } from '../../services/database.service';
import { NewBottleComponent } from './components/new-bottle/new-bottle.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faPlus = faPlus;
  faCog = faCog;
  faQuest = faQuestion;
  faFlask = faFlask;
  aromas: Aroma[];
  bottles: AromaBottle[];
  constructor(private dialog: MatDialog, private db: DatabaseService) { }

  ngOnInit(): void {
    this.db.getAromas.subscribe(aromas => this.aromas = aromas);
    this.db.getAromaBottles.subscribe(bottles => this.bottles = bottles);
    this.db.updateAromas();
    this.db.updateAromaBottles();
  }
  deleteBottle(id: number): void {
    this.db.deleteAromaBottle(id);
  }
  updateAroma(aroma: AromaBottle) {
    this.db.updateAromaBottle(aroma);
  }
  openNewBottleDialog(): void {
    const dialogRef = this.dialog.open(NewBottleComponent, {
      width: '20rem',
      data: this.aromas
    });
    dialogRef.afterClosed().subscribe((result: AromaBottle) => {
      if (result)
        this.db.addNewAromaBottle(result.price, result.level, result.size, result.aroma);
    });
  }
}
