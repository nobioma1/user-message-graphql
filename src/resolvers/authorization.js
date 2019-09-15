const { ForbiddenError } = require('apollo-server');
const { skip } = require('graphql-resolvers');

const isAuthenticated = (parent, args, context) => {
  const { authUser } = context;
  if (!authUser) {
    return new ForbiddenError('User not Authenticated');
  }
  skip;
};

module.exports = {
  isAuthenticated,
};
