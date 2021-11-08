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
    reviews: [Review!]!
  }

  input ProductsOnSale {
    onSale: Boolean!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }

  type Query {
    books: [Book]!
    profit: Boolean
    total: Float
    products(filter: ProductsOnSale): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }
`;
