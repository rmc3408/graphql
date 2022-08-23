import { ApolloServer } from 'apollo-server';
import {
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { context } from './graphql/context';
import PostsApi from './graphql/post/datasources';
import { typeDefs, resolvers } from './graphql/schema';
import UsersApi from './graphql/user/datasources';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  dataSources: () => {
    return { 
      postApi: new PostsApi(),
      userApi: new UsersApi(),
     } 
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
