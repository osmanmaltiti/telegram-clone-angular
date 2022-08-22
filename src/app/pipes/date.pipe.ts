import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipedate',
})
export class DateTransformPipe implements PipeTransform {
  month: Array<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  transform(value: string) {
    const split = value.split(', ');
    const [month, date, year] = split;

    return `${this.month[Number(month)]} ${date}, ${year}`;
  }
}
