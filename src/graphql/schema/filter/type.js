import { gql } from 'apollo-server-core';

export const filterTypeDefs = gql`
  input filterInput {
    _sort: String
    _order: ApiFilterOrder
    _limit: Int
    _start: Int
  }

  enum ApiFilterOrder {
    ASC
    DESC
  }
`;
