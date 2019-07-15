import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatMenuModule, MatProgressSpinnerModule, MatTableModule, MatToolbarModule} from '@angular/material';
import {ApplyTokenComponent} from './apply-token/apply-token.component';
import {TokenService} from './_services/token.service';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ProfileLogoComponent} from './profile-logo/profile-logo.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ListComponent} from './data/list/list.component';
import {TokenInterceptor} from './_interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ApplyTokenComponent,
    ProfileLogoComponent,
    ListComponent
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
    MatMenuModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
