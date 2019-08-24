const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const { usersData } = require('./data');

const app = express();

app.use(cors());

const schema = gql`
  type Query {
    info: String!
    users: [User!]
    user(id: ID!): User
  }

  type User {
    id: ID!
    username: String!
  }
`;

const resolvers = {
  Query: {
    info: () => 'Welcome to Learn-GraphQL',
    users: () => usersData,
    user: (root, args) => {
      const { id } = args;
      return usersData.find(user => user.id === id);
    },
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
