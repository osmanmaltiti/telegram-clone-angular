import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { setUser } from 'src/app/store/features/Users/user.action';
import { ICreateUser } from 'src/app/store/features/Users/user.types';
import { RootState } from 'src/app/store/store';
import { LoginQuery } from './query.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  password: string = '';
  number: any;

  constructor(
    private store: Store<RootState>,
    private loginQuery: LoginQuery,
    private router: Router,
    private socket: Socket
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const loginData = {
      number: Number(this.number),
      password: this.password,
    };

    this.loginQuery.watch({ data: loginData }).valueChanges.subscribe({
      next: ({ data }) => {
        const { loginUser } = data as unknown as { loginUser: ICreateUser };

        if (loginUser.id) localStorage.setItem('id', loginUser.id);

        this.store.dispatch(setUser({ payload: loginUser }));

        this.newConnection();

        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Invalid number or password');
      },
    });
  }

  newConnection() {
    this.socket.connect();

    this.socket.fromEvent('connected').subscribe({
      next: (value) => localStorage.setItem('socketId', String(value)),
    });
  }
}
