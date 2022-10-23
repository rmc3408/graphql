import { GraphQLWsLink } from '@apollo/client/link/subscriptions';

import { createClient } from 'graphql-ws';
import { authVar } from 'graphql/vars/auth';

const { token } = authVar.hydrate();

export const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://om-graph-ql.herokuapp.com/graphql',
    connectionParams: {
      Authorization: 'Bearer ' + token,
    },
  }),
);
