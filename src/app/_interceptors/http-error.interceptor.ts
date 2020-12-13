import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AlertService} from '../_services/alert.service';
import {AuthService} from '../_services/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private alertService: AlertService,
    private authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const observable = next.handle(req);
    observable.toPromise().catch(error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 0 || error.status.toString().startsWith('5')) {
          this.alertService.error(error.message);
        } else if (error.status === 401) {
          this.alertService.error('Your session expired. Please login again.');
          this.authService.logout();
        }
      }
    });
    return observable;
  }
}

export const HttpErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true,
};
