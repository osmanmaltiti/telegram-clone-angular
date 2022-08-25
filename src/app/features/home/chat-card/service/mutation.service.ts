import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class OpenChat extends Mutation {
  override document = gql`
    mutation Mutation($data: ChatMeta!) {
      openChat(data: $data) {
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
            file
            message
            chatDataId
          }
        }
      }
    }
  `;
}
