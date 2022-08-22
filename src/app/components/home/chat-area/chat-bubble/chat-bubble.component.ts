import { Component, Input, OnInit } from '@angular/core';
import { IMessages } from 'src/app/store/features/Chat/chat.types';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css'],
})
export class ChatBubbleComponent implements OnInit {
  @Input('data') data: IMessages = {
    chatDataId: '',
    message: '',
    time: '',
    from: '',
    id: '',
  };

  thisUser: any;

  constructor() {}

  ngOnInit(): void {
    const userdata = JSON.parse(String(localStorage.getItem('userdata')));
    this.thisUser = userdata.id;
  }
}
