const { ForbiddenError } = require('apollo-server');
const { skip } = require('graphql-resolvers');

const isAuthenticated = (parent, args, context) => {
  const { authUser } = context;
  if (!authUser) {
    return new ForbiddenError('User not Authenticated');
  }
  return skip;
};

const isAuthor = async (parent, args, context) => {
  const { id } = args;
  const { models, authUser } = context;
  const message = await models.Message.findByPk(id, { raw: true });

  if (message.userId !== authUser.id) {
    throw new ForbiddenError('Not authenticated for operation');
  }
  return skip;
};

module.exports = {
  isAuthenticated,
  isAuthor,
};
