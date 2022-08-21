import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class MutationService extends Mutation {
  override document = gql`
    mutation Mutation($message: MessageData!) {
      createMessage(message: $message) {
        id
        chatId
        date
        messages {
          id
          chatDataId
          from
          time
          message
        }
      }
    }
  `;
}
