const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const models = require('./data');
const schema = require('./schema');
const resolvers = require('./resolvers');

const app = express();

app.use(cors());

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
