module.exports = {
  Query: {
    messages: (parent, args, { models }) => {
      const { messagesData } = models;
      return messagesData;
    },
    message: (parent, args, { models }) => {
      const { messagesData } = models;
      return messagesData.find(message => message.id === args.id);
    },
  },
  Message: {
    user: (parent, args, { models }) => {
      const { usersData } = models;
      return usersData.find(user => user.id === parent.userId);
    },
  },
  User: {
    messages: (parent, args, { models }) => {
      const { messagesData } = models;
      return messagesData.filter(message => message.userId === parent.id);
    },
  },
  Mutation: {
    createMessage: (parent, args, { models, authUser }) => {
      const { messagesData, usersData } = models;
      const message = {
        id: usersData.length + 1,
        text: args.text,
        userId: authUser.id,
      };
      messagesData.push(message);
      return message;
    },
    updateMessage: (parent, args, { models }) => {
      const { messagesData } = models;
      const { id, text } = args;
      const pos = messagesData.findIndex(message => message.id === id);
      if (pos >= 0) {
        messagesData[pos] = { ...messagesData[pos], text };
        return messagesData[pos];
      }
    },
    deleteMessage: (parent, args, { models }) => {
      const { messagesData } = models;
      const pos = messagesData.findIndex(message => message.id === args.id);
      if (pos >= 0) {
        const [message] = messagesData.splice(pos, 1);
        return message;
      }
    },
  },
};
