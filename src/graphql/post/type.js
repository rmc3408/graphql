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

  extend type Query {
    getPost(id: ID!): Post! #PostResult!
    getPosts(input: filterInput): [Post!]!
  }

  # union PostResult = Post | PostNotfoundError | PostTimeOutError

  # interface PostError {
  #   statusCode: Int!
  #   message: String!
  # }

  # type PostTimeOutError implements PostError {
  #   statusCode: Int!
  #   message: String!
  #   timeout: Int!
  # }

  # type PostNotfoundError implements PostError {
  #   statusCode: Int!
  #   message: String!
  #   postId: String!
  # }
`;
