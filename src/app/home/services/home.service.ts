import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store/store';

@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor(private store: Store<RootState>) {}

  getUsers() {}
}
