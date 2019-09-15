const { ForbiddenError } = require('apollo-server');
const { skip } = require('graphql-resolvers');

const isAuthenticated = (parent, args, { authUser }) => {
  if (!authUser) {
    return new ForbiddenError('User not Authenticated');
  }
  return skip;
};

const isAuthor = async (parent, { id }, { models, authUser }) => {
  const message = await models.Message.findByPk(id, { raw: true });

  if (message.userId !== authUser.id) {
    throw new ForbiddenError('Not authenticated for operation');
  }
  return skip;
};

const isAdmin = (parent, args, { authUser: { role } }) => {
  if (role === 'admin') {
    return skip;
  }
  return new ForbiddenError(
    'User does not have authorization for this operation'
  );
};

module.exports = {
  isAuthenticated,
  isAuthor,
  isAdmin,
};
