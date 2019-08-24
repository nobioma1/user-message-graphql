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
    users: () => usersData,
    messages: () => messagesData,
    user: (parent, args) => {
      const { id } = args;
      return usersData.find(user => user.id === args.id);
    },
    message: (parent, args) => {
      const { id } = args;
      return messagesData.find(message => message.id === id);
    },
  },
  Message: {
    user: parent => {
      return usersData.find(user => user.id === parent.userId);
    },
  },
  User: {
    messages: parent => {
      return messagesData.filter(message => message.userId === parent.id);
    },
  },
  Mutation: {
    createMessage: (parent, args, context) => {
      const message = {
        id: usersData.length + 1,
        text: args.text,
        userId: context.authUser.id,
      };
      messagesData.push(message);
      return message;
    },
    deleteMessage: (parent, args) => {
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
    authUser: usersData[1],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 5000 }, () => {
  console.log('Server Live... 🚀');
});
