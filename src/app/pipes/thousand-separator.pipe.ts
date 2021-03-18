import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSeparator'
})
export class ThousandSeparatorPipe implements PipeTransform {

  transform(value: number): unknown {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    // return value.toLocaleStorage("et").replace(",", ".") 
    
  }

}
