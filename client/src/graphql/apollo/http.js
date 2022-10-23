import { HttpLink } from '@apollo/client';

export const httpLink = new HttpLink({
  //uri: 'http://localhost:4000/graphql',
  uri: 'https://om-graph-ql.herokuapp.com/graphql',
});
