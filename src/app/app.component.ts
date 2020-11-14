import { Component } from '@angular/core';
import { ElectronService } from './electron/electron.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'VapeCat';
  constructor(private electron: ElectronService) {
  }
}
