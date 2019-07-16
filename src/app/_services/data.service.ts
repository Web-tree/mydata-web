import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Data} from '../_models/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getList(): Promise<Data[]> {
    return this.httpClient.get<Data[]>(environment.backendUrl + '/data').toPromise();
  }

  add(data: Data) {
    return this.httpClient.post(environment.backendUrl + '/data', data).toPromise();
  }
}
