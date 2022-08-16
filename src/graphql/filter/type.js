import { gql } from 'apollo-server-core';

export const filterTypeDefs = gql`
  input filterInput {
    _sort: String
    _order: filtOrderEnum
    _limit: Int
    _start: Int
  }

  enum filtOrderEnum {
    ASC
    DESC
  }
`;
