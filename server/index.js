const { ApolloServer, gql } = require('apollo-server');

const mainCards = [
  {
    title: 'Recently Viewed',
    image: 'lion',
  },
  {
    title: 'Looking for a Gift?',
    image: 'penguin',
  },
  {
    title: 'Best Behaved',
    image: 'cat',
  },
];

const typeDefs = gql`
  type MainCard {
    title: String!
    image: String!
  }

  type Query {
    mainCards: [MainCard]
  }
`;

const resolvers = {
  Query: {
    mainCards: (parent, args, { mainCards }) => mainCards,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
