import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsageAddPageComponent} from './usage-add-page.component';
import {DataNotFoundComponent} from '../../error/data-not-found/data-not-found.component';
import {UsageAddFormComponent} from '../usage-add-form/usage-add-form.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute} from '@angular/router';
import {from, Observable, of} from 'rxjs';

describe('UsageAddPageComponent', () => {
  let component: UsageAddPageComponent;
  let fixture: ComponentFixture<UsageAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UsageAddPageComponent,
        DataNotFoundComponent,
        UsageAddFormComponent,
      ],
      imports: [
        HttpClientTestingModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatIconModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              queryParamMap: {
                has: () => true,
                get: () => 'url'
              }
            },
            paramMap: {
              subscribe: () => {
              }
            }
          }
        }
      ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any;
    activatedRoute.testQueryParamMap = {url: 'https://webtree.org'};

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
