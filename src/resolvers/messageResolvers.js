module.exports = {
  Query: {
    messages: async (parent, args, { models }) => {
      const { Message } = models;
      return await Message.findAll();
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
      console.log(parent.id);

      return await Message.findAll({
        where: {
          userId: parent.id,
        },
      });
    },
  },
  Mutation: {
    createMessage: async (parent, args, { models, authUser }) => {
      const { Message } = models;
      const message = {
        text: args.text,
        userId: authUser.id,
      };
      return await Message.create(message);
    },
    updateMessage: async (parent, args, { models }) => {
      const { Message } = models;
      const { id, text } = args;
      return await Message.update({ text }, { where: { id } });
    },
    deleteMessage: async (parent, args, { models }) => {
      const { Message } = models;
      const { id } = args;
      return await Message.destroy({ where: { id }, returning: true });
    },
  },
};
