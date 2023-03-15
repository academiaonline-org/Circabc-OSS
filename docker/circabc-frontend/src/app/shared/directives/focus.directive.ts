// copy from https://github.com/spirosikmd/angular2-focus/blob/master/src/focus.directive.ts
// because of issue https://github.com/spirosikmd/angular2-focus/issues/58
// when issue is fixt his need to be deleted
// and we need to use original library

import {
  AfterContentChecked,
  Directive,
  ElementRef,
  Input,
} from '@angular/core';

@Directive({
  selector: '[cbcFocus]',
})
export class FocusDirective implements AfterContentChecked {
  @Input()
  cbcFocus!: boolean;
  private element: HTMLElement;
  private hasFocused = false;

  constructor($element: ElementRef) {
    this.element = $element.nativeElement;
  }

  ngAfterContentChecked() {
    this.giveFocus();
  }

  giveFocus() {
    if (this.cbcFocus && !this.hasFocused) {
      this.element.focus();
      this.hasFocused = true;
    }
  }
}
