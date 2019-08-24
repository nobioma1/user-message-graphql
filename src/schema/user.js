const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }

  extend type Query {
    users: [User!]
    user(id: ID!): User
  }
`;
