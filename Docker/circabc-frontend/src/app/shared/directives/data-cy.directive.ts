// directive like in article https://medium.com/agilix/angular-and-cypress-data-cy-attributes-d698c01df062
import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { environment } from 'environments/environment';
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[data-cy]',
})
export class DataCyDirective {
  // tslint:disable-next-line:no-unused-variable
  constructor(private el: ElementRef, private renderer: Renderer2) {
    if (environment.production) {
      renderer.removeAttribute(el.nativeElement, 'data-cy');
    }
  }
}
