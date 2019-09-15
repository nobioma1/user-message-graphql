const { GraphQLDateTime } = require('graphql-iso-date');

const user = require('./userResolvers');
const message = require('./messageResolvers');

const customScalarResolver = {
  Date: GraphQLDateTime,
};

const info = {
  Query: {
    info: () => 'Welcome to Learn-GraphQL',
  },
};

module.exports = [customScalarResolver, info, user, message];
