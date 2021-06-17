const { ApolloServer, gql } = require("apollo-server");
const { collections, items } = require("./db");

const counter = { id: 1, count: 0 };

const typeDefs = gql`
  type Collection {
    id: ID!
    title: String!
    items: [Item!]!
  }

  type Counter {
    id: Int
    count: Int
  }

  type Item {
    id: ID!
    name: String!
    price: Float!
    imageUrl: String!
    collection: Collection
  }

  type Query {
    collections: [Collection!]!
    collection(id: ID!): Collection
    getCollectionsByTitle(title: String!): Collection
    counter: Counter
  }

  type Mutation {
    addCount(count: Int): Counter
  }
`;

const resolvers = {
  Query: {
    collections: (parent, args, ctx) => collections,
    collection: (parent, args, ctx) =>
      collections.find((collection) => collection.id === args.id),
    getCollectionsByTitle: (parent, args, ctx) =>
      collections.find(
        (collection) =>
          collection.title.toUpperCase() === args.title.toUpperCase()
      ),
    counter: (parent, args, ctx) => counter,
  },

  Collection: {
    items: (parent, args, ctx) => {
      return items.filter((item) => item.collection === parent.title);
    },
  },

  Item: {
    collection: (parent, args, ctx) =>
      collections
        .find(
          (collection) => collection.title.toUpperCase() === parent.collection
        )
        .toUpperCase(),
  },

  Mutation: {
    addCount: (parent, args, ctx) => {
      console.log(counter.count);
      return (counter.count = counter.count + args.count);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { collections, items },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
