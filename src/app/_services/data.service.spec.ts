import {TestBed} from '@angular/core/testing';

import {DataService} from './data.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';
import {Data} from '../_models/data';

describe('DataService', () => {
  let httpMock: HttpTestingController;
  let service: DataService;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ]
      });
      httpMock = TestBed.get(HttpTestingController);
      service = TestBed.get(DataService);
    }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('list', () => {
    it('should call backend', () => {
      service.getList();

      const req = httpMock.expectOne(environment.backendUrl + '/data');
      expect(req.request.method).toEqual('GET');
    });

    it('should return data from backend response', () => {
      const listPromise: Promise<Data[]> = service.getList();

      listPromise.then(dataList => {
        expect(dataList.length).toEqual(2);
        expect(dataList[0].name).toEqual('name1');
        expect(dataList[0].value).toEqual('value1');
        expect(dataList[1].name).toEqual('name2');
        expect(dataList[1].value).toEqual('value2');
      });

      httpMock.expectOne(environment.backendUrl + '/data').flush([
        {name: 'name1', value: 'value1'},
        {name: 'name2', value: 'value2'}
      ]);
    });
  });

  describe('add', () => {
    it('should call backend', () => {
      const data: Data = {name: 'aName', value: 'aValue'};
      service.add(data).then();

      const req = httpMock.expectOne(environment.backendUrl + '/data');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(data);
    });
  });
  describe('get', () => {
    it('should call backend', () => {
      service.get('aName').then();

      const req = httpMock.expectOne(environment.backendUrl + '/data/aName');
      expect(req.request.method).toEqual('GET');
    });

    it('should return promise with data from backend', () => {
      const sentData = {name: 'aName', value: 'aValue'};
      service.get('aName').then(data => {
        expect(data).toEqual(sentData);
      });

      httpMock.expectOne(environment.backendUrl + '/data/aName').flush(sentData);
    });
  });
  describe('update', () => {
    it('should call backend method', () => {
      const data = {name: 'aName', value: 'aValue'};
      service.update(data).then();

      const req = httpMock.expectOne(environment.backendUrl + '/data/aName');
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(data);
    });
  });
});
