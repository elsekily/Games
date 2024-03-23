import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorTubeMainComponent } from './components/color-tube-main/color-tube-main.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
      { path: '', component: HomeComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
