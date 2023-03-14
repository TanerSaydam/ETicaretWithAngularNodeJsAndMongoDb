import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productPipe',
  standalone: true
})
export class ProductPipe implements PipeTransform {

  transform(value: any, search: string): any {
    return value;
  }

}
