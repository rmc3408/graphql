const { ApolloServer, gql } = require("apollo-server");
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const { books, products, categories, reviews } = require("./data");


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    books,
    products,
    categories,
    reviews
  }
});

server.listen().then(({ url }) => {
  console.log("Apollo Server is running " + url);
});
