import { Component, Input, OnInit } from '@angular/core';
import { IMessages } from 'src/app/store/features/Chat/chat.types';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css'],
})
export class ChatBubbleComponent implements OnInit {
  @Input('refereePfp') refereePfp: any;
  @Input('data') data: IMessages = {
    chatDataId: '',
    message: '',
    time: '',
    from: '',
    id: '',
  };

  url: string = 'http://localhost:5000/';
  thisUser: any;

  constructor() {}

  ngOnInit(): void {
    const userdata = JSON.parse(String(localStorage.getItem('userdata')));
    this.thisUser = userdata.id;
  }
}
