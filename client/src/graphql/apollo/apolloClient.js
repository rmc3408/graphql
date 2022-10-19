import 'cross-fetch/polyfill';
import { ApolloClient, HttpLink } from '@apollo/client';
import { apolloCache } from './cache/cache';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://om-graph-ql.herokuapp.com/graphql',
  }),
  cache: apolloCache,
});

// client
//   .query({
//     query: gql`
//       query ExampleQuery {
//         _empty
//         books {
//           id
//           title
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));
