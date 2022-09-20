import { gql } from 'apollo-server-core';

export const loginTypeDefs = gql`
  type SignIn {
    userId: String!
    token: String!
  }

  extend type Mutation {
    signInUser(data: SignInInput): SignIn!
    signOutUser(userName: String!): Boolean!
  }

  input SignInInput {
    userName: String!
    password: String!
  }
`;
