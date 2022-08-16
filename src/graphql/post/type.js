import { gql } from 'apollo-server-core';

export const postTypeDefs = gql`
  type Post {
    id: ID!
    title: String
  }

  extend type Query {
    getPost: Post!
    getPosts: [Post!]!
  }
`;
