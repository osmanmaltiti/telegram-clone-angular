import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMessages } from 'src/app/store/features/Chat/chat.types';
import { RootState } from 'src/app/store/store';

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
    file: '',
    time: '',
    from: '',
    id: '',
  };

  postUrl: string = 'http://localhost:5000/posts/';
  url: string = 'http://localhost:5000/profile/';
  thisUser: any;
  userPfp: string = '';

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {
    const id = String(localStorage.getItem('id'));
    this.thisUser = id;
    this.store.select('UserReducer').subscribe({
      next: ({ user }) => {
        user && (this.userPfp = user.profile);
      },
    });
  }
}
