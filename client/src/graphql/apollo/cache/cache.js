import { InMemoryCache } from '@apollo/client';

export const apolloCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getPosts: {
          keyArgs: false,
          merge(existing = [], incoming = []) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});
