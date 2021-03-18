import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenTitle'
})
export class ShortenTitlePipe implements PipeTransform {

  transform(value: string, wordCount?: number): string {
    // Elas metsas mutionu, keset kuuski noori ---- split(" ") ---- {"elas", "metsas", "mutionu," ...(6)} ----
    // slice(0,2) --- {"Elas", "metsas"} ----- join("::") ---- "Elas::metsas"
    // küsimärk tähendab optional, hüüjumärk tähendab kui ei ole midagi (vastand väärtus)
    if (!wordCount) {
      wordCount = 3;
    }
    return value.split(" ").slice(0, wordCount).join(" ");
  }

}
