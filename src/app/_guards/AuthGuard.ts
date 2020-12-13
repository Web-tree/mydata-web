import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {AlertService} from '../_services/alert.service';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn() && this.authService.isTokenValid()) {
      return true;
    } else {
      this.alertService.error('You need to login for access page ' + state.url);
      this.router.navigate(['/']);
      return false;
    }
  }
}
