//import { mockPost } from '../mockData';

export const postResolvers = {
  Query: {
    getPost: async (parent, args, context, info) => {
      const data = await context.fetchPosts('/' + args.id);
      return data.json();
    },
    getPosts: async (parent, args, context, info) => {
      const data = await context.fetchPosts();
      return data.json();
    },
  },
};
