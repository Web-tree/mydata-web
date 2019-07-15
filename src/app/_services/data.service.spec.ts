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
        expect(dataList[0].userId).toEqual('userId1');
        expect(dataList[1].name).toEqual('name2');
        expect(dataList[1].value).toEqual('value2');
        expect(dataList[1].userId).toEqual('userId2');
      });

      httpMock.expectOne(environment.backendUrl + '/data').flush([
        {name: 'name1', value: 'value1', userId: 'userId1'},
        {name: 'name2', value: 'value2', userId: 'userId2'}
      ]);
    });
  });
});
