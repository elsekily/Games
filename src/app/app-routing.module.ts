import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorTubeMainComponent } from './components/color-tube-main/color-tube-main.component';
import { HomeComponent } from './components/home/home.component';
import { SnakeComponent } from './components/snake/snake.component';
import { MazeComponent } from './components/maze/maze.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'color-tube', component: ColorTubeMainComponent },
  { path: 'snake', component: SnakeComponent },
  { path: 'maze', component: MazeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
