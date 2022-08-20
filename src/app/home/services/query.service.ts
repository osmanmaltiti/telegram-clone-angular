import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class QueryService extends Query<Response> {
  override document = gql`
    {
      getUsers {
        id
        fullname
        number
        profile
      }
    }
  `;
}
