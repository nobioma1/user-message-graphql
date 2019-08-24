const user = require('./userResolvers');
const message = require('./messageResolvers');

const info = {
  Query: {
    info: () => 'Welcome to Learn-GraphQL',
  },
};

module.exports = [info, user, message];
