const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String
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
    signup(
      username: String!
      email: String!
      password: String!
      role: String
    ): Token!
    login(cred: String!, password: String!): Token!
    deleteUser(id: ID!): Boolean!
  }
`;
