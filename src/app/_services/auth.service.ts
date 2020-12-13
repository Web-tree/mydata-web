import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenService} from './token.service';
import {User} from '../_models/User';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  getUser(): Promise<User> {
    return this.http.post(environment.authUrlBack + '/checkToken', this.tokenService.getToken()).toPromise();
  }

  isLoggedIn(): boolean {
    return this.tokenService.tokenExists();
  }

  isTokenValid(): Promise<boolean> {
    return this
      .getUser()
      .then(() => Promise.resolve(true))
      .catch(reason => {
        console.log(reason);
        return false;
      });
  }

  logout(): void {
    this.tokenService.removeToken();
  }
}
