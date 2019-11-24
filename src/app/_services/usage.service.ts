import {Usage, UsageList} from '../_models/usage';
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
    return this.http.post<any>(this.getUsageUrl(dataName), usage).toPromise();
  }

  list(dataName: string): Promise<UsageList> {
    return this.http.get<any>(this.getUsageUrl(dataName)).toPromise();
  }

  private getUsageUrl(dataName: string) {
    return environment.backendUrl + '/data/' + dataName + '/usage';
  }
}
