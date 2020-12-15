import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Data} from '../_models/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  isExists(name: string): Promise<boolean> {
    return Promise.resolve<any>((resolve, reject) => {
      return this.get(name)
        .then(() => resolve(true))
        .catch(reason => this.isNotFoundError(reason) ? resolve(false) : reject(reason));
    });
  }

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getList(): Promise<Data[]> {
    return this.httpClient.get<Data[]>(environment.backendUrl + '/data').toPromise();
  }

  getDataCount(): Promise<any> {
    return this.httpClient.get<string>(environment.backendUrl + '/data/count').toPromise();
  }

  add(data: Data): Promise<any> {
    return this.httpClient.post(environment.backendUrl + '/data', data).toPromise();
  }

  get(name: string): Promise<Data> {
    return this.httpClient.get<Data>(environment.backendUrl + '/data/' + name).toPromise();
  }

  private isNotFoundError = (reason): boolean => reason instanceof HttpErrorResponse && reason.status === 404;

  update(data: Data) {
    return this.httpClient.put(environment.backendUrl + '/data/' + data.name, data).toPromise();
  }

  delete(name: string): Promise<void> {
    return this.httpClient.delete<void>(environment.backendUrl + '/data/' + name).toPromise();
  }
}
