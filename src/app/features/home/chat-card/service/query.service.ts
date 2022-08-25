import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class QueryService extends Query<Response> {
  override document = gql`
    query Query($data: String!) {
      getLastMessage(data: $data) {
        file
        message
        time
        from
      }
    }
  `;
}
