const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

app.use(cors());

const schema = gql`
  type Query {
    info: String!
  }
`;

const resolvers = {
  Query: {
    info: () => 'Welcome to Learn-GraphQL',
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 5000 }, () => {
  console.log('Server Live... 🚀');
});
