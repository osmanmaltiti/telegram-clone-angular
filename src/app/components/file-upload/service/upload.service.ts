import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  onUpload(file: any) {
    const id = String(localStorage.getItem('id'));

    const formdata = new FormData();
    formdata.append('image', file);

    return this.http.post<{ status: string; data: string }>(
      'http://localhost:5000/upload',
      formdata,
      {
        headers: new HttpHeaders({ type: 'post' }),
      }
    );
  }
}
