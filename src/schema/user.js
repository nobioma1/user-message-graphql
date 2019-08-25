const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    messages: [Message!]
  }

  type Token {
    token: String!
  }

  extend type Query {
    users: [User!]
    user(id: ID!): User
  }

  extend type Mutation {
    signup(username: String!, email: String!, password: String!): Token!
    login(cred: String!, password: String!): Token!
  }
`;
