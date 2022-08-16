import { gql } from 'apollo-server-core';
import { bookResolvers, bookTypeDefs } from './book/typeResolver';
import { userResolvers } from './user/resolvers';
import { userTypeDefs } from './user/type';

const rootTypeDefs = gql`
  type Query {
    _empty: Boolean
  }
`;

const rootResolvers = {
  Query: {
    _empty: () => true,
  },
};

export const typeDefs = [rootTypeDefs, userTypeDefs, bookTypeDefs];
export const resolvers = [rootResolvers, userResolvers, bookResolvers];
