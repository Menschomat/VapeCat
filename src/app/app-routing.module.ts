import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SettingsComponent } from './views/settings/settings.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
