import { ApolloClient, HttpLink, from, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
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

const errorLink = onError(({ graphQLErrors }) => {
  if (!graphQLErrors) return;

  graphQLErrors.forEach((error) => {
    const errorCode = error && error.extensions && error.extensions.code;

    if (errorCode === 'UNAUTHENTICATED') {
      console.log('ESSE USUÁRIO NÃO ESTÁ LOGADO, DESLOGANDO...');
      authVar.reset();
    }
  });
});

const forwardLink = new ApolloLink((operation, forward) => {
  //console.log('CLIENT REQUEST');
  //console.log('Client initiates from Home component to forward link to process new data');

  if (operation.operationName == 'GET_POSTS') {
    //console.log('operation name is', operation.operationName);
    //console.log('Context new data', operation.getContext());
    operation.setContext({ start: new Date().getTime(), headers: { _ABC_: 2 } });
  }

  //console.log('SERVER RESPONSE');
  return forward(operation).map((response) => {
    //console.log(response.data.getPosts.pop());
    return response;
  });
});

const httpLink = new HttpLink({
  //uri: 'http://localhost:4000/graphql',
  uri: 'https://om-graph-ql.herokuapp.com/graphql',
});

export const apolloClient = new ApolloClient({
  // HttpLink must be last one, HttpLink and BatchHttpLink are both examples of terminating links.
  link: from([forwardLink, authLink, httpLink]),
  cache: apolloCache,
});
