import { mockUser } from '../mockData';

export const userResolvers = {
  Query: {
    getUser: () => mockUser[0],
    getUsers: () => mockUser,
  },
};
