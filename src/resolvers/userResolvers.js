module.exports = {
  Query: {
    users: async (parent, args, { models }) => {
      const { User } = models;
      return await User.findAll();
    },
    user: async (parent, args, { models }) => {
      const { User } = models;
      return await User.findByPk(args.id);
    },
  },
};
