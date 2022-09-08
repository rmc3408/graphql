import { gql } from 'apollo-server-core';

export const postTypeDefs = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    userId: String!
    indexRef: Int!
    createdAt: String!
    user: User!
    unixTimestamp: String!
  }

  input CreatePostInput {
    title: String!
    body: String!
    userId: String!
  }

  input UpdatePostInput {
    title: String
    body: String
    userId: String
  }

  extend type Query {
    getPost(id: ID!): Post! #PostResult!
    getPosts(input: filterInput): [Post!]!
  }

  extend type Mutation {
    createPost(data: CreatePostInput): Post!
    patchPost(id: ID!, data: UpdatePostInput!): Post!
    deletePost(id: ID!): Boolean!
  }
`;
