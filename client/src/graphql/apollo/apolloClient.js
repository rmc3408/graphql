import { ApolloClient, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { apolloCache } from './cache/cache';
import { authVar } from 'graphql/vars/auth';

const authLink = setContext((_, { headers }) => {
  const { token } = authVar.hydrate();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : 'wrong',
    },
  };
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  //uri: 'https://om-graph-ql.herokuapp.com/graphql',
  credentials: 'same-origin',
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: apolloCache,
});
