import { Pipe, PipeTransform, ElementRef } from '@angular/core';

@Pipe({
  name: 'ngForHook'
})

export class NgForHookPipe implements PipeTransform {

  transform(value: string, object: any, element: ElementRef, index: number, fn: any): any {

    fn(object, element, index);

    return value;
  }

}
