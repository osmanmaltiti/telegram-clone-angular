import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { ICreateUser } from 'src/app/store/features/Users/user.types';
import { RootState } from 'src/app/store/store';
import { IIcons, SiderbarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output('close_sidebar') close: EventEmitter<any> = new EventEmitter();
  @Input('open') open: boolean = false;

  buttons: Array<IIcons> | undefined;
  user: ICreateUser | null | undefined;
  hide: boolean = false;
  url: string = 'http://localhost:5000/profile/';

  constructor(
    private siderbarService: SiderbarService,
    private store: Store<RootState>,
    private router: Router,
    private socket: Socket
  ) {}

  ngOnInit(): void {
    this.store.select('UserReducer').subscribe({
      next: (value) => (this.user = value.user),
    });

    this.buttons = this.siderbarService.button;
  }

  onShow() {
    this.hide = !this.hide;
  }

  onClose() {
    this.close.emit();
  }

  logOut() {
    this.router.navigate(['/auth']);
    localStorage.removeItem('id');
    localStorage.removeItem('socketId');
    this.socket.emit('disconnected');
  }
}
