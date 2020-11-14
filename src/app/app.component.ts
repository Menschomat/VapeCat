import { Component } from '@angular/core';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import { ElectronService } from './electron/electron.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'VapeCat';
  faCat = faCat;
  constructor(private electron: ElectronService) {
  }

}
