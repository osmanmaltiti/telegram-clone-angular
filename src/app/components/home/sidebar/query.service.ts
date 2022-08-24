import { Injectable } from '@angular/core';
import { gql, Query, TypedDocumentNode } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { DocumentNode } from 'graphql';

@Injectable({
  providedIn: 'root',
})
export class QueryService extends Query<Response> {
  override document:
    | DocumentNode
    | TypedDocumentNode<Response, EmptyObject> = gql`
    {
      
    }
  `;
}
