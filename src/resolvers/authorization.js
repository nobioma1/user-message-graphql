import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, context) => {
  const { authUser } = context;
  if (authUser) {
    skip;
  }
  new ForbiddenError('User not Authenticated');
};
