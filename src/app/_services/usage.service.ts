import {Usage} from '../_models/usage';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsageService {

  constructor(private http: HttpClient) {
  }

  add(dataName: string, usage: Usage): Promise<Usage> {
    return this.http.post<any>(environment.backendUrl + '/data/' + dataName + '/usage', usage).toPromise();
  }
}
