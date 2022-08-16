//import { mockPost } from '../mockData';

export const postResolvers = {
  Query: {
    getPost: async (parent, args, context, info) => {
      const data = await context.fetchPosts('/' + args.id);
      return data.json();
    },
    getPosts: async (parent, args, context, info) => {
      //console.log(args.input)
      const filterArgsPosts = new URLSearchParams(args.input)
      //console.log(filterArgsPosts.toString())
      const data = await context.fetchPosts('/?' + filterArgsPosts);
      return data.json();
    },
  },
  Post: {
    unixTimestamp: (parent, args, context, info) => {
      //console.log(parent.createdAt);
      const newTime = new Date(parent.createdAt).getSeconds();
      return newTime;
    }
  }
};
