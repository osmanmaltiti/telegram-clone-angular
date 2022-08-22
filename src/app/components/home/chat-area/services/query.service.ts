import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class ChatQuery extends Query<Response> {
  override document = gql`
    query Query($id: ID!) {
      getChat(id: $id) {
        id
        combinedUserIds
        refereeId
        data {
          id
          chatId
          date
          messages {
            id
            from
            time
            message
            chatDataId
          }
        }
      }
    }
  `;
}
