import { Pipe, PipeTransform, ElementRef } from '@angular/core';

@Pipe({name: 'ngForHook'})
export class NgForHookPipe implements PipeTransform {

  transform(value: string, el: ElementRef, object: any, index: number, scope: any): any {
    // Function pointer causes referencing misalignment
    // Using class scope instead
    return scope.cloudAnima(value, el, object, index);
  }

}
