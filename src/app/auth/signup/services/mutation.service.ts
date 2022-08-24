import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class SignUpMutation extends Mutation {
  override document = gql`
    mutation Mutation($data: UserData!) {
      createUser(data: $data) {
        id
        fullname
        number
        profile
      }
    }
  `;
}
