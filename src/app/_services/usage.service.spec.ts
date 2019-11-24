import {UsageService} from './usage.service';
import {Usage, UsageList} from '../_models/usage';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {environment} from '../../environments/environment';

describe('Usage service', () => {
  let httpMock: HttpTestingController;
  let usageService: UsageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    usageService = TestBed.get(UsageService);
  });

  it('should send POST request when on add', (done: DoneFn) => {
    const usage = new Usage();
    usage.usageType = 'url';
    usage.usageValue = 'https://some.url';
    usageService.add('a-name', usage).then(value => {
      expect(value).toEqual(usage);
      return done();
    });
    const request = httpMock.expectOne(`${environment.backendUrl}/data/a-name/usage`);
    request.flush(usage);

    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(usage);
  });

  describe('list method', () => {

    it('should send GET request when get list', async () => {
      const usageListPromise: Promise<UsageList> = usageService.list('a-name');
      const request = httpMock.expectOne(`${environment.backendUrl}/data/a-name/usage`);
      request.flush({});

      await usageListPromise;

      expect(request.request.method).toEqual('GET');
    });

    it('should return data from request', (done: DoneFn) => {
      const usageListPromise: Promise<UsageList> = usageService.list('a-name');
      const request = httpMock.expectOne(`${environment.backendUrl}/data/a-name/usage`);
      const returnData: UsageList = {url: [{usageType: 'a', usageValue: 'b'}, {usageType: 'c', usageValue: 'd'}]};
      request.flush(returnData);
      usageListPromise.then(usageList => {
        expect(usageList).toEqual(returnData);
        done();
      });
    });
  });
});
