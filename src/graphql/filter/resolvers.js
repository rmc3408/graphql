
export const filterResolvers = {
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
  Post: {
    unixTimestamp: (parent, args, context, info) => {
      //console.log(parent.createdAt);
      const newTime = new Date(parent.createdAt).getSeconds();
      return newTime;
    }
  }
};
