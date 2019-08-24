const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const models = require('./data');

const app = express();

app.use(cors());

const schema = gql`
  type Query {
    info: String!
    users: [User!]
    user(id: ID!): User
    messages: [Message!]!
    message(id: ID!): Message
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }

  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Message
  }
`;

const resolvers = {
  Query: {
    info: () => 'Welcome to Learn-GraphQL',
    users: (parent, args, { models }) => {
      const { usersData } = models;
      return usersData;
    },
    messages: (parent, args, { models }) => {
      const { messagesData } = models;
      return messagesData;
    },
    user: (parent, args, { models }) => {
      const { usersData } = models;
      return usersData.find(user => user.id === args.id);
    },
    message: (parent, args, { models }) => {
      const { messagesData } = models;
      return messagesData.find(message => message.id === args.id);
    },
  },
  Message: {
    user: (parent, args, { models }) => {
      const { usersData } = models;
      return usersData.find(user => user.id === parent.userId);
    },
  },
  User: {
    messages: (parent, args, { models }) => {
      const { messagesData } = models;
      return messagesData.filter(message => message.userId === parent.id);
    },
  },
  Mutation: {
    createMessage: (parent, args, { models, authUser }) => {
      const { messagesData, usersData } = models;
      const message = {
        id: usersData.length + 1,
        text: args.text,
        userId: authUser.id,
      };
      messagesData.push(message);
      return message;
    },
    deleteMessage: (parent, args, { models }) => {
      const { messagesData } = models;
      const pos = messagesData.findIndex(message => message.id === args.id);
      if (pos >= 0) {
        const [message] = messagesData.splice(pos, 1);
        return message;
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    authUser: models.usersData[1],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 5000 }, () => {
  console.log('Server Live... 🚀');
});
