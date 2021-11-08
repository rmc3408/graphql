const { ApolloServer, gql } = require("apollo-server");

const { books, products } = require("./data");

// A schema is a collection of type definitions (hence "typeDefs")
// Scalar type = String, int, float and boolean
const typeDefs = gql`
  type Book {
    title: String
    author: Author
    isPublished: Boolean
    price: Float
  }

  type Author {
    name: String
  }

  type Product {
    id: String!
    name: String!
    description: String
    quantity: Int!
    price: Float!
    onSale: Boolean!
    image: String!
  }

  type Query {
    books: [Book]!
    profit: Boolean
    total: Float
    products: [Product!]!
    product(id: ID!): Product
  }
`;

// functions
const resolvers = {
  Query: {
    books: () => books,
    profit: () => true,
    total: () => 100,
    products: () => products,
    product: (parent, args, context) => {
      const prodID = args.id;
      const foundProduct = products.find((item) => item.id === prodID);
      return foundProduct;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log("Apollo Server is running " + url);
});
