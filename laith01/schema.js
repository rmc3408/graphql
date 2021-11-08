const { gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// Scalar type = String, int, float and boolean
exports.typeDefs = gql`
  type Book {
    title: String
    author: Author
    isPublished: Boolean
    price: Float
  }

  type Author {
    name: String
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]
  } 

  type Product {
    id: ID!
    name: String!
    description: String
    quantity: Int!
    price: Float!
    onSale: Boolean!
    image: String!
    category: Category
  }

  type Query {
    books: [Book]!
    profit: Boolean
    total: Float
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }
`;
