const express = require('express');
const cors = require('cors');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const http = require('http');

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
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req, connection }) => {
    /*
      http request come with req and res, while
      subscription sends a connection object
    */
    if (connection) {
      return {
        models,
      };
    }

    if (req) {
      const authUser = await getAuthUser(req);
      return {
        models,
        authUser,
      };
    }
  },
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
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 5000 }, () => {
  console.log('Server Live... 🚀');
});
