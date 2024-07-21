import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTitle'
})
export class SearchTitlePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((value: any) => {
      return (value.title.toLocaleLowerCase().includes(args));
      //To filter description
      //|| (value.description.toLocaleLowerCase().includes(args))
    })

  }
}