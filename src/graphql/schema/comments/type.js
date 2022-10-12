import { gql } from 'apollo-server-core';

export const commentTypeDefs = gql`
  type Comment {
    id: ID!
    comment: String!
    user: User!
    createdAt: String
  }

  extend type Query {
    getComment(id: ID!): Comment!
    getComments(input: filterInput): [Comment!]!
  }

  extend type Mutation {
    createComment(data: CreateCommentInput): Comment!
    patchComment(id: ID!, data: UpdateUserInput!): Comment!
    deleteComment(id: ID!): Boolean!
  }

  input CreateCommentInput {
    comment: String!
    postId: String!
  }

  input UpdateCommentInput {
    Comment: String
    postId: String!
  }
`;
