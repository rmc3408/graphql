import { ApolloClient, from, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { apolloCache } from './cache/cache';
import { httpLink } from './http';
import { authLink, forwardLink } from './link';
import { wsLink } from './websocket';

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export const apolloClient = new ApolloClient({
  // HttpLink must be last one OR SplitLink are both examples of terminating links.
  link: from([forwardLink, authLink, splitLink]),
  cache: apolloCache,
});
