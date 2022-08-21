import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store/store';
import { fetchUsers } from '../store/features/Users/user.action';
import { IGetUsers } from '../store/features/Users/user.types';
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
  allUsers: Array<IGetUsers> = [];

  constructor(private apollo: QueryService, private store: Store<RootState>) {}

  ngOnInit(): void {
    this.getUsers();
    this.getChats();
  }

  getUsers() {
    this.apollo.watch().valueChanges.subscribe({
      next: ({ loading, data }) => {
        const { getUsers } = data as unknown as { getUsers: Array<IGetUsers> };
        this.store.dispatch(fetchUsers({ payload: getUsers }));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getChats() {
    this.store.select('UserReducer').subscribe({
      next: (value) => {
        this.allUsers = value.allUsers;
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
