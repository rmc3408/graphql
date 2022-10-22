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
    Post: {
      fields: {
        numberOfcomments(nonExistingData, arg) {
          //console.log(arg);
          console.log('NumberComments', arg.readField('comment'));
          return arg.readField('comment').length;
        },
      },
    },
  },
});
