import { Component, OnInit } from '@angular/core';
import { faSquare, faWindowClose, faWindowMaximize, faWindowMinimize } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ElectronService } from 'src/app/electron/electron.service';

@Component({
  selector: 'app-frame-controller',
  templateUrl: './frame-controller.component.html',
  styleUrls: ['./frame-controller.component.scss']
})
export class FrameControllerComponent implements OnInit {
  faMini = faWindowMinimize;
  faMax = faSquare;
  faClose = faTimes;
  constructor(private electron: ElectronService) { }

  ngOnInit(): void {
  }
  quit() {
    this.electron.quit()
  }
  maximize() {
    this.electron.maximize()
  }
  minimize() {
    this.electron.minimize()
  }
}
