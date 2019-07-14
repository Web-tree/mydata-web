import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {ApplyTokenComponent} from './apply-token/apply-token.component';
import {TokenService} from './_services/token.service';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ProfileLogoComponent} from './profile-logo/profile-logo.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ApplyTokenComponent,
    ProfileLogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // angular
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatButtonModule,
    MatMenuModule
  ],
  providers: [
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
