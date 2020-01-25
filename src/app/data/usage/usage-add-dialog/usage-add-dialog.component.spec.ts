import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsageAddDialogComponent} from './usage-add-dialog.component';
import {MatCardModule, MatIconModule, MatInputModule, MatSelectModule, MatSnackBarModule} from '@angular/material';
import {SatPopoverModule} from '@ncstate/sat-popover';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UsageService} from '../../../_services/usage.service';
import {By} from '@angular/platform-browser';
import {UsageAddFormComponent} from '../usage-add-form/usage-add-form.component';
import Spy = jasmine.Spy;

describe('UsageAddDialogComponent', () => {
  let component: UsageAddDialogComponent;
  let fixture: ComponentFixture<UsageAddDialogComponent>;
  let usageService: UsageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsageAddDialogComponent,
        UsageAddFormComponent
      ],
      imports: [
        MatIconModule,
        MatCardModule,
        MatSelectModule,
        MatInputModule,
        MatSnackBarModule,
        SatPopoverModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: UsageService, useValue: jasmine.createSpyObj('UsageService', ['add'])},
      ]
    })
      .compileComponents();
    usageService = TestBed.get(UsageService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when add button is clicked', () => {
    beforeEach(() => {
      fixture.debugElement.query(By.css('.open-button')).nativeElement.click();
    });
    describe('popup window', () => {
      it('should be visible', () => {
        const popupWindow = fixture.debugElement.query(By.css('.sat-popover-container'));
        expect(popupWindow).toBeTruthy();
      });

      xit('should be closed after click on close button', () => {
        fixture.debugElement.query(By.css('.sat-popover-container .close-button')).nativeElement.click();
        expect(fixture.debugElement.query(By.css('.sat-popover-container'))).toBeFalsy();
      });

      xit('should close window after success call', () => {
        // @ts-ignore
        (usageService as Spy).add.and.returnValue(Promise.resolve());

        const submitButton = fixture.debugElement.query(By.css('button[type=submit]'));
        submitButton.nativeElement.click();

        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.sat-popover-container'))).toBeFalsy();
      });
    });
  });
});
