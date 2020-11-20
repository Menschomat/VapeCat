import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import { ElectronService } from './electron/electron.service';
import { DatabaseService } from './services/database.service';
import { SettingsService } from './services/settings.service';
import { SettingsComponent } from './views/settings/settings.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'VapeCat';
  isMac = false;
  faCat = faCat;

  constructor(private electron: ElectronService, private db: DatabaseService, private settings: SettingsService, public dialog: MatDialog) {
    console.log(this.electron.platform);
    this.isMac = (this.electron.platform === electron.platforms.MAC);
  }
  openSettings(): void {
    const dialogRef = this.dialog.open(SettingsComponent, {
      width: '100%',
      height: '90vh',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      result;
    });
  }

}
