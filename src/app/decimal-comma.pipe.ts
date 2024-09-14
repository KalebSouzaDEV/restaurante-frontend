import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalComma',
  standalone: true
})
export class DecimalCommaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == null) return '';
    return value.toString().replace('.', ',');
  }

}
