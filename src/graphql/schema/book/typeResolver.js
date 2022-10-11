import { gql } from 'apollo-server-core';
import { mockBooks } from '../../mockData';

export const bookTypeDefs = gql`
  type Book {
    id: ID!
    title: String
    author: String
    published: Int
    price: Float
    isNew: Boolean!
    tags: [String!]!
  }

  extend type Query {
    books: [Book]
    getFirstTitle: String
    getFirstBook: Book
    getTags: [String!]!
  }
`;

export const bookResolvers = {
  Query: {
    books: () => mockBooks,
    getFirstTitle: () => mockBooks[0].title,
    getFirstBook: () => mockBooks[0],
    getTags: () => mockBooks[1].tags,
  },
};
