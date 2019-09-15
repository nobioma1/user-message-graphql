const { gql } = require('apollo-server-express');

module.exports = gql`
  type Message {
    id: ID!
    text: String!
    createdAt: Date!
    user: User!
  }

  extend type Query {
    messages(cursor: String, limit: Int): MessageConnection!
    message(id: ID!): Message
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    updateMessage(id: ID!, text: String!): Message
    deleteMessage(id: ID!): Boolean!
  }

  type MessageConnection {
    edges: [Message!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }
`;
