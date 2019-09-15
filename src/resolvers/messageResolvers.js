const Sequelize = require('sequelize');
const { combineResolvers } = require('graphql-resolvers');

const { isAuthenticated, isAuthor } = require('../resolvers/authorization');

module.exports = {
  Query: {
    messages: async (parent, args, { models }) => {
      const { cursor, limit = 100 } = args;
      const { Message } = models;
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: cursor,
              },
            },
          }
        : {};
      return await Message.findAll({
        order: [['createdAt', 'DESC']],
        limit,
        ...cursorOptions,
      });
    },
    message: async (parent, args, { models }) => {
      const { Message } = models;
      return await Message.findByPk(args.id);
    },
  },
  Message: {
    user: async (parent, args, { models }) => {
      const { User } = models;
      return await User.findByPk(parent.userId);
    },
  },
  User: {
    messages: async (parent, args, { models }) => {
      const { Message } = models;
      return await Message.findAll({
        where: {
          userId: parent.id,
        },
      });
    },
  },
  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, args, { models, authUser }) => {
        const { Message } = models;
        const message = {
          text: args.text,
          userId: authUser.id,
        };
        return await Message.create(message);
      }
    ),
    updateMessage: combineResolvers(
      isAuthenticated,
      isAuthor,
      async (parent, args, { models }) => {
        const { Message } = models;
        const { id, text } = args;
        const [, [message]] = await Message.update(
          { text },
          { where: { id }, returning: true }
        );
        return message;
      }
    ),
    deleteMessage: combineResolvers(
      isAuthenticated,
      isAuthor,
      async (parent, args, { models }) => {
        const { Message } = models;
        const { id } = args;
        return await Message.destroy({ where: { id }, returning: true });
      }
    ),
  },
};
