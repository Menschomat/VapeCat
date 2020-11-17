import { Component, OnInit } from '@angular/core';
import { faCog, faFlask, faPlus, faQuestion } from '@fortawesome/free-solid-svg-icons';

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
  constructor() { }

  ngOnInit(): void {
  }

}
