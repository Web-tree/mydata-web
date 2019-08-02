import {Pipe, PipeTransform} from '@angular/core';
import {TitleCasePipe} from '@angular/common';

@Pipe({
  name: 'dataName'
})
export class DataNamePipe extends TitleCasePipe implements PipeTransform {

  transform(value: string): any {
    return super.transform(value).replace('-', ' ');
  }
}
