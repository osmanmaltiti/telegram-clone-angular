import {
  Directive,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appScroll]',
})
export class ScrollBottomDirective implements OnInit, OnChanges {
  @Input('appScroll') elementRef: any;
  @Input('chatData') currentChatData: any;
  @HostBinding('scrollTop') scrollToBottom: any;

  ngOnInit(): void {
    this.scroll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.scroll();
  }

  scroll() {
    const chatarea = document.getElementById('chatarea');
    if (chatarea) {
      chatarea.scrollTop = chatarea.scrollHeight;
    }
  }
}
