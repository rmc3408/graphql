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

  extend type Mutation {
    createUser(data: CreateUserInput): User!
    patchUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    userName: String!
    password: String!
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    userName: String
    password: String
  }
`;
