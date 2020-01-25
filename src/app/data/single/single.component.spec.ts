import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleComponent} from './single.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
// tslint:disable-next-line:max-line-length
import {MatCardModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule, MatTabsModule, MatTooltipModule} from '@angular/material';
import {AlertService} from '../../_services/alert.service';
import {SatPopoverModule} from '@ncstate/sat-popover';
import {UsageAddDialogComponent} from '../usage/usage-add-dialog/usage-add-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UsageListComponent} from '../usage/usage-list/usage-list.component';
import {UsageAddFormComponent} from '../usage/usage-add-form/usage-add-form.component';
import {DataNotFoundComponent} from '../error/data-not-found/data-not-found.component';

describe('SingleComponent', () => {
  let component: SingleComponent;
  let fixture: ComponentFixture<SingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SingleComponent,
        UsageAddDialogComponent,
        UsageAddFormComponent,
        UsageListComponent,
        DataNotFoundComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SatPopoverModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatSelectModule,
        MatDialogModule,
        MatCardModule,
        MatSnackBarModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        {provide: AlertService, useValue: jasmine.createSpyObj('AlertService', ['success'])},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
