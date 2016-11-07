import { Pipe, PipeTransform, ElementRef } from '@angular/core';

// created as a universal ngFor pipe so get the element when it's made 
// can be used for animation or callbacks
@Pipe({name: 'ngForHook'})
export class NgForHookPipe implements PipeTransform {

  transform(value: string, el: ElementRef, object: any, index: number, scope: any): any {
    // Function pointer causes referencing misalignment
    // Using class scope instead
    return scope.cloudAnima(value, el, object, index);
  }

}
