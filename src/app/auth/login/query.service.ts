import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class LoginQuery extends Query<Response> {
  override document = gql`
    query Query($data: LoginData!) {
      loginUser(data: $data) {
        id
        fullname
        number
        profile
      }
    }
  `;
}
