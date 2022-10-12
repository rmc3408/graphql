import { gql } from 'apollo-server-core';
import { bookResolvers, bookTypeDefs } from './book/typeResolver';
import { userResolvers } from './user/resolvers';
import { userTypeDefs } from './user/type';
import { postResolvers } from './post/resolvers';
import { postTypeDefs } from './post/type';
import { filterTypeDefs } from './filter/type';
import { filterResolvers } from './filter/resolvers';
import { loginTypeDefs } from './login/type';
import { loginResolvers } from './login/resolvers';
import { commentTypeDefs } from './comments/type';
import { commentResolvers } from './comments/resolvers';


const rootTypeDefs = gql`
  type Query {
    _empty: Boolean
  }
  type Mutation {
    _empty: Boolean
  }
`;

const rootResolvers = {
  Query: {
    _empty: () => true,
  },
  Mutation: {
    _empty: () => true,
  },
};

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  bookTypeDefs,
  postTypeDefs,
  filterTypeDefs,
  loginTypeDefs,
  commentTypeDefs,
];

export const resolvers = [
  rootResolvers,
  userResolvers,
  bookResolvers,
  postResolvers,
  filterResolvers,
  loginResolvers,
  commentResolvers
];
