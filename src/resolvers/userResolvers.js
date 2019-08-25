const { UserInputError, AuthenticationError } = require('apollo-server');
const { generateToken } = require('../utils/authToken');

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
  Mutation: {
    signup: async (parent, args, { models }) => {
      const { User } = models;
      const { username, email, password } = args;
      try {
        const user = await User.create({
          username,
          email,
          password,
        });
        const token = generateToken(user);

        return { token };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (parent, args, { models }) => {
      const { User } = models;
      // (cred) - username or email
      const { cred, password } = args;
      const user = await User.findByCred(cred);
      if (!user) {
        throw new UserInputError('User with credential does not exist');
      }
      const isValid = await user.validatePassword(password);
      if (!isValid) {
        throw new AuthenticationError('Invalid Password');
      }
      const token = generateToken(user);
      return { token };
    },
  },
};
