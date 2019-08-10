import {HttpErrorResponse} from '@angular/common/http';

export function isNotFoundError(error): boolean {
  return error instanceof HttpErrorResponse && error.status === 404;
}
