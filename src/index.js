const { ApolloServer, gql } = require('apollo-server');
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String
    author: String
    published: Int
    price: Float
    isNew: Boolean!
    tags: [String!]!
  }
  type User {
    id: ID!
    userName: String!
    tags: [String]
  }

  type Query {
    getUser: User
    getUsers: [User!]
    books: [Book]
    getFirstTitle: String
    getFirstBook: Book
    getTags: [String!]!
  }
`;

const resolvers = {
  Query: {
    books: () => mockBooks,
    getFirstTitle: () => mockBooks[0].title,
    getFirstBook: () => mockBooks[0],
    getTags: () => mockBooks[1].tags,
    getUser: () => mockUser[0],
    getUsers: () => mockUser,
  },
};

const mockBooks = [
  {
    id: 'dire-9384nf84',
    title: 'The Awakening',
    author: 'Kate Chopin',
    published: 2010,
    price: 50.99,
    isNew: true,
    tags: ['sciFi', '2022'],
  },
  {
    id: 'dire-mf803nd9',
    title: 'City of Glass',
    author: 'Paul Auster',
    published: 2022,
    price: 10.99,
    isNew: false,
    tags: ['empty'],
  },
];

const mockUser = [
  {
    id: 'dire-9384nf84',
    userName: 'Kate Chopin',
    tags: ['sciFi', '2022'],
  },
  {
    id: 'dire-mf803nd9',
    userName: 'Paul Auster',
    tags: ['empty'],
  },
  {
    id: 'dire-00001823',
    userName: 'Johny Walker',
    tags: ['drink'],
  },
];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
