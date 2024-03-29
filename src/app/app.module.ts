import { ChangeDetectorRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { ColorTubeMainComponent } from './components/color-tube-main/color-tube-main.component';
import { ColorTubeComponent } from './components/color-tube-main/color-tube/color-tube.component';
import { FormsModule } from '@angular/forms';
import { HomeCardComponent } from './components/home-card/home-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ColorTubeMainComponent,
    ColorTubeComponent,
    HomeCardComponent
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
