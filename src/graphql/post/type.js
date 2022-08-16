import { gql } from 'apollo-server-core';

export const postTypeDefs = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    userId: String!
    indexRef: Int!
    createdAt: String!
    #user: User!
  }

  extend type Query {
    getPost(id: ID!): Post!
    getPosts: [Post!]!
  }
`;
