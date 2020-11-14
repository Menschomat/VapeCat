import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home.component';
import { LiquidCalcComponent } from './components/liquid-calc/liquid-calc.component';
import { CoilCalcComponent } from './components/coil-calc/coil-calc.component';
import { AromaManagerComponent } from './components/aroma-manager/aroma-manager.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Material
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SettingsComponent } from './views/settings/settings.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FrameControllerComponent } from './components/frame-controller/frame-controller.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LiquidCalcComponent,
    CoilCalcComponent,
    AromaManagerComponent,
    SettingsComponent,
    FrameControllerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatButtonModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
