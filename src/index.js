const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

const models = require('./models');
const schema = require('./schema');
const resolvers = require('./resolvers');

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async () => ({
    models,
    authUser: await models.User.findByCred('johnFardom'),
  }),
  formatError: error => {
    // remove sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 5000 }, () => {
  console.log('Server Live... 🚀');
});
