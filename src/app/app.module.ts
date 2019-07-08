import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatToolbarModule} from '@angular/material';
import {ApplyTokenComponent} from './apply-token/apply-token.component';
import {TokenService} from '../_services/token.service';

@NgModule({
  declarations: [
    AppComponent,
    ApplyTokenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // angular
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
