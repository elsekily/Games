import { ChangeDetectorRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { ColorTubeMainComponent } from './components/color-tube-main/color-tube-main.component';
import { ColorTubeComponent } from './components/color-tube-main/color-tube/color-tube.component';
import { FormsModule } from '@angular/forms';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { SnakeComponent } from './components/snake/snake.component';
import { MazeComponent } from './components/maze/maze.component';
import { MatchesComponent } from './components/matches/matches.component';
import { NumberComponent } from './components/matches/number/number.component';
import { SignComponent } from './components/matches/sign/sign.component';
import { EqualComponent } from './components/matches/equal/equal.component';
import { EquationComponent } from './components/matches/equation/equation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ColorTubeMainComponent,
    ColorTubeComponent,
    HomeCardComponent,
    SnakeComponent,
    MazeComponent,
    MatchesComponent,
    NumberComponent,
    SignComponent,
    EqualComponent,
    EquationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
