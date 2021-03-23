import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item.model';

@Pipe({
  name: 'uniqueCategory'
})
export class UniqueCategoryPipe implements PipeTransform {

  transform(value: Item[]): string[] {
    return value.map(item => item.category).filter((value, index, array) => array.indexOf(value) == index);
  }
// .indexOf("fishing") --- annab järjekorra numbri ehk loeb ule kõik kategooriad ja annab numbrid
//  .filter(ese=>true)  --- jätab valitud alles
//  .map(ese=>uus)  ----asendab
}
