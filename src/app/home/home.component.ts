import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store/store';
import { fetchUsers, setUser } from '../store/features/Users/user.action';
import { ICreateUser, IGetUsers } from '../store/features/Users/user.types';
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
    const id = String(localStorage.getItem('id'));

    this.apollo.watch({ id }).valueChanges.subscribe({
      next: ({ loading, data }) => {
        const { getUsers, user } = data as unknown as {
          getUsers: Array<IGetUsers>;
          user: ICreateUser;
        };
        this.store.dispatch(fetchUsers({ payload: getUsers }));
        this.store.dispatch(setUser({ payload: user }));
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

  onUpdateChat() {
    this.getUsers();
    this.getChats();
  }
}
