import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'cbc-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss'],
  preserveWhitespaces: true,
})
export class HintComponent {
  @Input()
  public title!: string;
  @Input()
  public text!: string;
  @Input()
  public floatEnable = true;
  @Output()
  public readonly clickOutside = new EventEmitter<MouseEvent>();

  public shown = false;
  private elementRef: ElementRef;

  // todo
  // add an Input parameter that choose if the hint has to be displayed on top / bottom / left / right
  // need to make the component adaptive, if outside the screen, it should self adapt.

  public constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(event);
      this.shown = false;
    }
  }
}
