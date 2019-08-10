import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {DataService} from '../_services/data.service';
import {isNotFoundError} from '../_helpers/http-response.helper';

export function isNameExists(dataService: DataService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return dataService.get(control.value).then(() => {
      return {nameExists: true};
    }).catch(error => {
      return isNotFoundError(error) ? null : error;
    });
  };
}
