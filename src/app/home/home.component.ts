import { Component, OnInit } from '@angular/core';
import { ICurrentChat } from '../store/features/Chat/chat.action';
import { HomeService, IAllChats } from './services/home.service';
import { QueryService } from './services/query.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{ provide: 'apollo', useValue: 'apollo-inject' }],
})
export class HomeComponent implements OnInit {
  openAside: boolean = false;
  openChat: boolean = false;
  allChatHeads: Array<ICurrentChat> = [];
  allChats: Array<IAllChats> = [];

  constructor(private homeService: HomeService, private apollo: QueryService) {}

  ngOnInit(): void {
    this.allChatHeads = this.homeService.chatHead;
    this.allChats = this.homeService.allChats;
    this.apollo.watch().valueChanges.subscribe({
      next: ({ loading, data }) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleAside() {
    this.openAside = !this.openAside;
  }

  toggleChat() {
    this.openChat = !this.openChat;
  }
}
