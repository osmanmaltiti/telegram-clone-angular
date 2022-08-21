import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class ChatQuery extends Query<Response> {
  override document = gql`
  {
    
  }
  `;
}
