const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const { usersData, messagesData } = require('./data');

const app = express();

app.use(cors());

const schema = gql`
  type Query {
    info: String!
    users: [User!]
    user(id: ID!): User
    messages: [Message!]!
    message(id: ID!): Message!
  }

  type User {
    id: ID!
    username: String!
  }

  type Message {
    id: ID!
    text: String!
  }
`;

const resolvers = {
  Query: {
    info: () => 'Welcome to Learn-GraphQL',
    users: () => usersData,
    messages: () => messagesData,
    user: (root, args) => {
      const { id } = args;
      return usersData.find(user => user.id === id);
    },
    message: (root, args) => {
      const { id } = args;
      return messagesData.find(message => message.id === id);
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
