const { gql } = require('apollo-server-express');

module.exports = gql`
  type Message {
    id: ID!
    text: String!
    user: User!
  }

  extend type Query {
    messages: [Message!]!
    message(id: ID!): Message
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    updateMessage(id: ID!, text: String!): Message
    deleteMessage(id: ID!): Boolean!
  }
`;