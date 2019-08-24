const { gql } = require('apollo-server-express');

const userSchema = require('./user');
const messageSchema = require('./message');

// schema stitching

const linkSchema = gql`
  type Query {
    info: String!
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports = [linkSchema, userSchema, messageSchema];
