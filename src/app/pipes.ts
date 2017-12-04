import { Pipe, PipeTransform } from '@angular/core';
import { Produkt } from './produkt';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: Produkt[], term): any {

        if (term.set.size === 0) {
            return items;
        } else {
            return items.filter(item => term.set.has(item.getKategoria()));
        }
    }
}
