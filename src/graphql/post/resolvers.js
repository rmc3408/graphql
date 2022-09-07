
export const postResolvers = {
  Query: {
    getPost: async (parent, args, context, info) => {
      const data = await context.dataSources.postApi.getPost(args.id);
      return data;
    },
    getPosts: async (parent, args, context, info) => {
      const data = await context.dataSources.postApi.getPosts()      
      return data;
    },
  },
  Post: {
    unixTimestamp: (parent, args, context, info) => {
      const newTime = new Date(parent.createdAt).getSeconds();
      return newTime;
    },
    user: async (parent, args, context, info) => {
      const loaderData = await context.dataSources.userApi.dataLoader.load(parent.userId);
      return loaderData;
    },
  },
  Mutation: {
    createPost: async (parent, args, context, info) => {
      return context.dataSources.postApi.createPost(args.data)
    }
  }
};


