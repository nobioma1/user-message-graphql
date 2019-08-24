module.exports = {
  Query: {
    users: (parent, args, { models }) => {
      const { usersData } = models;
      return usersData;
    },
    user: (parent, args, { models }) => {
      const { usersData } = models;
      return usersData.find(user => user.id === args.id);
    },
  },
};
