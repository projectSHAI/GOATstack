import { Pipe, PipeTransform, ElementRef } from '@angular/core';

@Pipe({
  name: 'ngForHook'
})

export class NgForHookPipe implements PipeTransform {

  transform(value: string, element: ElementRef, fn: any): any {

    fn(element);

    return value;
  }

}
