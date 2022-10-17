import 'cross-fetch/polyfill';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://om-graph-ql.herokuapp.com/graphql',
  cache: new InMemoryCache(),
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
//         getFirstTitle
//       }
//     `,
//   })
//   .then((result) => console.log(result));
