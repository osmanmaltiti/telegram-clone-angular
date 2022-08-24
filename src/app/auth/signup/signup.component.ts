import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setUser } from 'src/app/store/features/Users/user.action';
import { ICreateUser } from 'src/app/store/features/Users/user.types';
import { RootState } from 'src/app/store/store';
import { SignUpMutation } from './services/mutation.service';
import { SignupService } from './services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnChanges {
  imageUrl: any;
  file: any = '';

  loading: boolean = false;

  profile: any;
  number: any;
  fullname: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private store: Store<RootState>,
    private signupService: SignupService,
    private signUpMutation: SignUpMutation
  ) {}

  ngOnChanges(): void {}

  ngOnInit(): void {}

  onChange(event: Event) {
    const file = (<HTMLInputElement>event.target).files;

    if (file) this.file = file[0];

    this.imageUrl = URL.createObjectURL(this.file);

    this.signupService.onUploadImage(this.file).subscribe({
      next: (value) => {
        this.profile = value.data;
      },
    });
  }

  onSubmit() {
    const userdata = {
      profile: this.profile,
      fullname: this.fullname,
      number: Number(this.number),
      password: this.password,
    };

    this.signUpMutation.mutate({ data: userdata }).subscribe({
      next: ({ data }) => {
        const { createUser } = data as unknown as { createUser: ICreateUser };

        if (createUser.id) localStorage.setItem('id', createUser.id);

        this.store.dispatch(setUser({ payload: createUser }));

        this.router.navigate(['/']);
      },
    });
  }
}
