import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { IGetUsers } from 'src/app/store/features/Users/user.types';
import { RootState } from './../../store/store';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
  @Input('appHighlight') color: string = '';
  @Input('text-color') textcolor: string = '';

  @HostBinding('style.backgroundColor') style: any;
  @HostBinding('style.color') textColor: any;

  @Input('user') user: IGetUsers | undefined;
  @Output('openChat') openChat: EventEmitter<any> = new EventEmitter();

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.onFocus();
  }

  @HostListener('click') setFocus(event: Event) {
    this.openChat.emit();
    this.onFocus();
  }

  onFocus() {
    this.store.select('UserReducer').subscribe({
      next: (value) => {
        const { referee } = value;
        if (referee) {
          if (referee.id !== this.user?.id) {
            this.style = '';
            this.textColor = '';
          } else {
            this.style = this.color;
            this.textColor = this.textcolor;
          }
        } else {
          this.style = '';
          this.textColor = '';
        }
      },
    });
  }
}
