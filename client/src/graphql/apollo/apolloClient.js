import 'cross-fetch/polyfill';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://om-graph-ql.herokuapp.com/graphql',
  }),
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
//       }
//     `,
//   })
//   .then((result) => console.log(result));
