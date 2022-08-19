import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ICurrentChat,
  setCurrentChat,
} from 'src/app/store/features/Chat/chat.action';
import store from 'src/app/store/store';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
  @Input('appHighlight') color: string = '';
  @Input('text-color') textcolor: string = '';

  @HostBinding('style.backgroundColor') style: any;
  @HostBinding('style.color') textColor: any;

  initChat = {
    profile: '',
    name: '',
    last_message: '',
    createdAt: Date.now(),
    id: '',
  };

  @Input('chat') chat: ICurrentChat = this.initChat;
  storeChat: ICurrentChat = this.initChat;

  constructor(private stores: Store<typeof store>) {}
  ngOnInit(): void {
    this.stores.select('chatReducer').subscribe({
      next: (value: any) => {
        const { currentChat } = value as { currentChat: ICurrentChat };
        if (currentChat) {
          if (currentChat.id !== this.chat.id) {
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

  @HostListener('click') setFocus(event: Event) {
    this.stores.dispatch(setCurrentChat({ payload: this.chat }));
  }
}
