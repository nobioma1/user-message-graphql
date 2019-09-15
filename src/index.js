const express = require('express');
const cors = require('cors');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');

const models = require('./models');
const schema = require('./schema');
const resolvers = require('./resolvers');
const { verifyToken } = require('./utils/authToken');

const app = express();

app.use(cors());

const getAuthUser = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await verifyToken(token);
    } catch (error) {
      throw new AuthenticationError('Your Session expired. Sign in Again');
    }
  }
  throw new AuthenticationError('You are not authenticated for this operation');
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => ({
    models,
    authUser: await getAuthUser(req),
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
