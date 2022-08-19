import { Component, OnInit } from '@angular/core';
import { ICurrentChat } from '../store/features/Chat/chat.action';
import { HomeService, IAllChats } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  openAside: boolean = false;
  openChat: boolean = false;
  allChatHeads: Array<ICurrentChat> = [];
  allChats: Array<IAllChats> = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.allChatHeads = this.homeService.chatHead;
    this.allChats = this.homeService.allChats;
  }

  toggleAside() {
    this.openAside = !this.openAside;
  }

  toggleChat() {
    this.openChat = !this.openChat;
  }
}
