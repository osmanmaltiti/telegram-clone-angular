import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class QueryService extends Query<Response> {
  override document = gql`
    query Query($id: ID!) {
      getUsers {
        id
        fullname
        number
        profile
      }

      user(id: $id) {
        fullname
        profile
        number
      }
    }
  `;
}
