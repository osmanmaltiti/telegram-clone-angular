import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ICurrentChat } from 'src/app/store/features/Chat/chat.types';
import { RootState } from './../../store/store';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
  @Input('appHighlight') color: string = '';
  @Input('text-color') textcolor: string = '';

  @HostBinding('style.backgroundColor') style: any;
  @HostBinding('style.color') textColor: any;

  @Input('chat') chat: ICurrentChat | undefined;

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    this.store.select('ChatReducer').subscribe({
      next: (value) => {
        const { currentChat } = value;
        if (currentChat) {
          if (currentChat.id !== this.chat?.id) {
            this.style = '';
            this.textColor = '';
          } else {
            this.style = this.color;
            this.textColor = this.textcolor;
          }
        }
      },
    });
  }

  @HostListener('click') setFocus(event: Event) {}
}
