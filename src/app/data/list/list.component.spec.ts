import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListComponent} from './list.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataService} from '../../_services/data.service';
import {Data} from '../../_models/data';
import SpyObj = jasmine.SpyObj;
import {By} from '@angular/platform-browser';
import {MatProgressSpinnerModule, MatTableModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {DataNamePipe} from '../../_pipes/data-name.pipe';

describe('ListComponent', () => {
  let fixture: ComponentFixture<ListComponent>;
  let dataService: SpyObj<DataService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent,
        DataNamePipe
      ],
      imports: [
        HttpClientTestingModule,
        MatTableModule,
        MatProgressSpinnerModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: DataService,
          useValue: jasmine.createSpyObj('DataService', ['getList'])
        }
      ]
    })
      .compileComponents();
    dataService = TestBed.get(DataService);
  }));

  const mockDataList = (data) => dataService.getList.and.callFake(() => Promise.resolve<Data[]>(data));

  describe('when data list is empty', () => {
    beforeEach(async () => {
      mockDataList([]);
      fixture = TestBed.createComponent(ListComponent);
      await fixture.whenStable();
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });
    it('should show message the empty list empty list', () => {
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain(`You don't have data yet.`);
    });
  });

  describe('when list contains some data', () => {
    beforeEach(async () => {
      mockDataList([
        {name: 'someName', value: 'someValue'}
      ]);
      fixture = TestBed.createComponent(ListComponent);
      await fixture.whenStable();
      fixture.detectChanges();
    });
    beforeEach(() => {
      fixture.detectChanges();
    });
    it('should not show the empty list message', () => {
      expect(fixture.nativeElement.textContent).not.toContain(`You don't have data yet.`);
    });

    xit('should show the data', () => {
      const dataValue = fixture.debugElement.query(By.css('.mat-cell'));
      expect(dataValue).toBeTruthy();
    });
  });

});
