import { mockPost } from '../mockData';

export const postResolvers = {
  Query: {
    getPost: () => mockPost[0],
    getPosts: () => mockPost,
  },
};
