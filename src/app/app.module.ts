import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import {MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule, MatTableModule, MatToolbarModule, MatTooltipModule} from '@angular/material';
import {ApplyTokenComponent} from './apply-token/apply-token.component';
import {TokenService} from './_services/token.service';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ProfileLogoComponent} from './profile-logo/profile-logo.component';
import {HttpClientModule} from '@angular/common/http';
import {ListComponent} from './data/list/list.component';
import {TokenInterceptorProvider} from './_interceptors/token.interceptor';
import {AddComponent} from './data/add/add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertService} from './_services/alert.service';
import {SingleComponent} from './data/single/single.component';
import {DeleteDataDialogComponent} from './data/single/delete-data-dialog.component';
import {DataNamePipe} from './_pipes/data-name.pipe';
import {ChangeDataTypeDialogComponent} from './data/single/change-data-type-dialog.component';
import {NotFoundComponent} from './errors/not-found/not-found.component';
import {DataService} from './_services/data.service';
import {HttpErrorInterceptorProvider} from './_interceptors/http-error.interceptor';
import {SatPopoverModule} from '@ncstate/sat-popover';
import {UsageAddComponent} from './data/usage/usage-add/usage-add.component';
import {UsageService} from './_services/usage.service';

@NgModule({
  declarations: [
    AppComponent,
    ApplyTokenComponent,
    ProfileLogoComponent,
    ListComponent,
    AddComponent,
    SingleComponent,
    DeleteDataDialogComponent,
    ChangeDataTypeDialogComponent,
    DataNamePipe,
    NotFoundComponent,
    UsageAddComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
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
    MatProgressBarModule,
    MatExpansionModule,
    MatDialogModule,

    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatTooltipModule,
    MatSelectModule,
    SatPopoverModule,
  ],
  entryComponents: [
    DeleteDataDialogComponent,
    ChangeDataTypeDialogComponent
  ],
  providers: [
    TokenService,
    AlertService,
    DataService,
    UsageService,
    TokenInterceptorProvider,
    HttpErrorInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
