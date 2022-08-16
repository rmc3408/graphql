import { gql } from 'apollo-server-core';

export const userTypeDefs = gql`
  type User {
    id: ID!
    userName: String!
    tags: [String]
  }

  extend type Query {
    getUser: User!
    getUsers: [User!]!
  }
`;
