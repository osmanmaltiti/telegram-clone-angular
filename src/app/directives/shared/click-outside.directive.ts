import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  @Output('close') close: EventEmitter<any> = new EventEmitter();
  @Input('appClickOutside') element: any;

  @HostListener('click', ['$event.target']) onClose(event: Event) {
    if (event !== this.element) return;
    this.close.emit();
  }
}
