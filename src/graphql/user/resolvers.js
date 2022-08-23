
export const userResolvers = {
  Query: {
    getUser: async (parent, args, context, info) => {
      const data = await context.dataSources.userApi.getUser(args.id);
      return data;
    },
    getUsers: async (parent, args, context, info) => {
      const data = await context.dataSources.userApi.getUsers();
      return data;
    },
  },
  User: {
    posts: async (parent, args, context, info) => {
      const loaderData = await context.dataSources.postApi.dataLoader.load(parent.id)
      return loaderData;
    },
  },
};
