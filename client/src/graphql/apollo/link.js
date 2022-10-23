import { ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { authVar } from 'graphql/vars/auth';

export const authLink = setContext((_, { headers }) => {
  const { token } = authVar.hydrate();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : 'wrong',
    },
  };
});

export const forwardLink = new ApolloLink((operation, forward) => {
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

export const errorLink = onError(({ graphQLErrors }) => {
  if (!graphQLErrors) return;

  graphQLErrors.forEach((error) => {
    const errorCode = error && error.extensions && error.extensions.code;

    if (errorCode === 'UNAUTHENTICATED') {
      console.log('ESSE USUÁRIO NÃO ESTÁ LOGADO, DESLOGANDO...');
      authVar.reset();
    }
  });
});
