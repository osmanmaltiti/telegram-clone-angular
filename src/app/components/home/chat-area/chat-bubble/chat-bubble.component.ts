import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css'],
})
export class ChatBubbleComponent implements OnInit {
  @Input('data') data: {
    from: string;
    time: number;
    message: string;
  } = {
    from: '',
    time: 0,
    message: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
