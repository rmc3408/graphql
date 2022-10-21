import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { context, contextWS } from './graphql/context';
import { typeDefs, resolvers } from './graphql/schema';
import UsersApi from './graphql/schema/user/datasources';
import PostsApi from './graphql/schema/post/datasources';
import LoginApi from './graphql/schema/login/datasources';
import { CommentSQLDataSource } from './graphql/schema/comments/datasources';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import { useServer } from 'graphql-ws/lib/use/ws';

const knexfile = require('../knexfile');

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3001', 'https://studio.apollographql.com', 'https://om-graph-ql.herokuapp.com/'],
    credentials: true,
  }),
);

const httpServer = createServer(app);
const wsServer = new WebSocketServer({ server: httpServer, path: '/' });
// eslint-disable-next-line react-hooks/rules-of-hooks
const serverCleanup = useServer(
  {
    schema,
    context: async (ctx, msg, args) => {
      return contextWS(ctx.connectionParams.Authorization || ctx.extra.request.headers.cookie);
    },
    onConnect: async (ctx) => {
      console.log('🚀 Connected to WebSocket');
    },
    onDisconnect(ctx, code, reason) {
      console.log('Disconnected!');
    },
    path: '/',
    keepAlive: 5000,
  },
  wsServer,
);

const server = new ApolloServer({
  schema,
  context,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
  dataSources: () => {
    return {
      postApi: new PostsApi(),
      userApi: new UsersApi(),
      loginApi: new LoginApi(),
      commentApi: new CommentSQLDataSource(knexfile[process.env.NODE_ENV]),
    };
  },
});

const PORT = process.env.PORT || 4000;

server.start().then(() => {
  server.applyMiddleware({ app });
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
