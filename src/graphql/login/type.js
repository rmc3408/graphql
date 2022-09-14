import { gql } from 'apollo-server-core';

export const loginTypeDefs = gql`
  type SignIn {
    userId: String!
    token: String!
  }

  extend type Mutation {
    signInUser(data: SignInInput): SignIn!
  }

  input SignInInput {
    userName: String!
    password: String!
  }
`;
