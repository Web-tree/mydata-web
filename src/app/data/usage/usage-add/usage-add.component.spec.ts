import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsageAddComponent} from './usage-add.component';
import {MatCardModule, MatIconModule, MatInputModule, MatSelectModule, MatSnackBarModule} from '@angular/material';
import {SatPopoverModule} from '@ncstate/sat-popover';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UsageService} from '../../../_services/usage.service';
import {By} from '@angular/platform-browser';
import {Usage} from '../../../_models/usage';

describe('UsageAddComponent', () => {
  let component: UsageAddComponent;
  let fixture: ComponentFixture<UsageAddComponent>;
  let usageService: UsageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsageAddComponent],
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
    fixture = TestBed.createComponent(UsageAddComponent);
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
    });

    describe('and when form was filled', () => {
      beforeEach(() => {
        component.type.setValue('url');
        component.url.setValue('https://github.com');
        component.dataName = 'a-name';
        fixture.detectChanges();
      });

      it('should have valid form', () => {
        expect(component.form.valid).toBeTruthy();
      });

      describe('and submitted', () => {
        it('should call add method on usage service', () => {
          const submitButton = fixture.debugElement.query(By.css('button[type=submit]'));
          submitButton.nativeElement.click();

          expect(usageService.add).toHaveBeenCalledWith('a-name', {
            usageType: 'url',
            usageValue: 'https://github.com'
            } as Usage
          );
        });
        xit('should close window after success call', () => {
          (usageService as any).add.and.returnValue(Promise.resolve());

          const submitButton = fixture.debugElement.query(By.css('button[type=submit]'));
          submitButton.nativeElement.click();

          fixture.detectChanges();
          expect(fixture.debugElement.query(By.css('.sat-popover-container'))).toBeFalsy();
        });
      });
    });
  });
});
