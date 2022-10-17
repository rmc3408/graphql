const { gql } = require('apollo-server');

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
    products(filter: BySale): [Product!]
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

  input BySale {
    onSale: Boolean
    avgRating: Int
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
    products(filter: BySale): [Product!]!
    product(id: ID!): Product
    categories(filter: BySale): [Category!]!
    category(id: ID!): Category
  }

  input AddCat {
    name: String!
  }

  input AddProduct {
    name: String!
    description: String
    quantity: Int!
    price: Float!
    onSale: Boolean!
    image: String!
    cat_id: String!
  }

  input AddReview {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: String!
  }

  input UpdateCat {
    name: String!
  }

  type Mutation {
    addC(input: AddCat!): Category!
    addP(input: AddProduct!): Product!
    addR(input: AddReview!): Review!
    deleteC(id: ID!): Boolean
    updateC(id: ID!, input: UpdateCat!): Category!
  }
`;
