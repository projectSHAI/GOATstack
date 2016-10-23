import { Pipe, PipeTransform, ElementRef } from '@angular/core';

@Pipe({
  name: 'ngForHook'
})

export class NgForHookPipe implements PipeTransform {

  transform(value: string, test: any, object: any, element: ElementRef, index: number, fn: any): any {

    return fn(value, test, object, element, index);
  }

}
