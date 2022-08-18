import { gql } from 'apollo-server-core';

export const userTypeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    indexRef: Int!
    createdAt: String!
    posts: [Post!]!
  }

  extend type Query {
    getUser(id: ID!): User!
    getUsers(input: filterInput): [User!]!
  }
`;
