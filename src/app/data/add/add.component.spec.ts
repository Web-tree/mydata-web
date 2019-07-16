import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddComponent} from './add.component';
import {MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Location, LocationStrategy} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DataService} from '../../_services/data.service';
import {By} from '@angular/platform-browser';
import {AlertService} from '../../_services/alert.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let dataService: DataService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddComponent,
      ],
      imports: [
        NoopAnimationsModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        RouterTestingModule
      ],
      providers: [
        {provide: Location, useValue: jasmine.createSpyObj('Location', ['back'])},
        {provide: DataService, useValue: jasmine.createSpyObj('DataService', ['add'])},
        {provide: AlertService, useValue: jasmine.createSpyObj('AlertService', ['success'])},

      ]
    })
      .compileComponents();
    dataService = TestBed.get(DataService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call add method on form submit', () => {
    component.form.controls.name.setValue('aName');
    component.form.controls.value.setValue('aValue');
    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);

    expect(dataService.add).toHaveBeenCalledWith({name: 'aName', value: 'aValue'});
  });
});
