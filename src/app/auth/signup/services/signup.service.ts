import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SignupService {
  constructor(private http: HttpClient) {}

  onUploadImage(profile: any) {
    const socketId = String(localStorage.getItem('socketId'));

    const formdata = new FormData();
    formdata.append('image', profile);

    return this.http.post<{ status: string; data: string }>(
      'http://localhost:5000/upload',
      formdata,
      {
        headers: new HttpHeaders({
          id: socketId,
          type: 'profile',
        }),
      }
    );
  }
}
