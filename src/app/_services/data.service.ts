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

  add(data: Data): Promise<any> {
    return this.httpClient.post(environment.backendUrl + '/data', data).toPromise();
  }

  get(name: string): Promise<Data> {
    return this.httpClient.get<Data>(environment.backendUrl + '/data/' + name).toPromise();
  }

  update(data: Data) {
    return this.httpClient.put(environment.backendUrl + '/data/' + data.name, data).toPromise();
  }

  delete(name: string): Promise<void> {
    return this.httpClient.delete<void>(environment.backendUrl + '/data/' + name).toPromise();
  }
}
