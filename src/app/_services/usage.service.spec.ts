import {UsageService} from './usage.service';
import {Usage} from '../_models/usage';
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
    usage.type = 'url';
    usage.value = 'https://some.url';
    usageService.add('a-name', usage).then(value => {
      expect(value).toEqual(usage);
      return done();
    });
    const request = httpMock.expectOne(`${environment.backendUrl}/data/a-name/usage`);
    request.flush(usage);

    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(usage);
  });
});
