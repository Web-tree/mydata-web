import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatSnackBarModule, MatTableModule, MatToolbarModule} from '@angular/material';
import {ApplyTokenComponent} from './apply-token/apply-token.component';
import {TokenService} from './_services/token.service';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ProfileLogoComponent} from './profile-logo/profile-logo.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ListComponent} from './data/list/list.component';
import {TokenInterceptor} from './_interceptors/token.interceptor';
import {AddComponent} from './data/add/add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertService} from './_services/alert.service';
import {SingleComponent} from './data/single/single.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplyTokenComponent,
    ProfileLogoComponent,
    ListComponent,
    AddComponent,
    SingleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // forms
    FormsModule,
    ReactiveFormsModule,
    // angular
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,

    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),

  ],
  providers: [
    TokenService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
