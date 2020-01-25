import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsageAddFormComponent} from './usage-add-form.component';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {Usage} from '../../../_models/usage';
import {UsageService} from '../../../_services/usage.service';
import {MatInputModule} from '@angular/material/input';
import {AlertService} from '../../../_services/alert.service';
import SpyObj = jasmine.SpyObj;

describe('UsageAddFormComponent', () => {
  let component: UsageAddFormComponent;
  let fixture: ComponentFixture<UsageAddFormComponent>;
  let usageService: SpyObj<UsageService>;
  let alertService: SpyObj<AlertService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsageAddFormComponent],
      imports: [
        HttpClientTestingModule,
        MatSelectModule,
        MatSnackBarModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: UsageService, useValue: jasmine.createSpyObj('UsageService', ['add'])},
        {provide: AlertService, useValue: jasmine.createSpyObj('AlertService', ['success'])},
      ]
    })
      .compileComponents();
    usageService = TestBed.get(UsageService);
    alertService = TestBed.get(AlertService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.callback = jasmine.createSpy('callback');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
      describe('on success adding', () => {
        let submitButton;
        beforeEach(() => {
          submitButton = fixture.debugElement.query(By.css('button[type=submit]'));
          usageService.add.and.returnValue(Promise.resolve());
          submitButton.nativeElement.click();
        });
        it('should call add method on usage service with parameters from form', () => {
          expect(usageService.add).toHaveBeenCalledWith('a-name', {
              usageType: 'url',
              usageValue: 'https://github.com'
            } as Usage
          );
        });
        it('should call alert service', () => {
          fixture.whenStable().then(() => {
            expect(alertService.success).toHaveBeenCalledWith('Usage was successfully added. Type: url. Value: https://github.com');
          });
        });
        it('should execute callback', () => {
          fixture.whenStable().then(() => {
            expect(component.callback).toHaveBeenCalledWith('a-name');
          });
        });
      });
    });
  });

});
