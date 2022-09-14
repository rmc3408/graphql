
export const userResolvers = {
  Query: {
    getUser: async (parent, args, context, info) => {
      if (!context.loggedUserID) throw new AuthenticationError('you must be logged in');
      
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
  Mutation: {
    createUser: async (parent, args, context, info) => {
      return context.dataSources.userApi.createUser(args.data)
    },
    patchUser: async (parent, args, context, info) => {
      return context.dataSources.userApi.updateUser(args.id, args.data)
    },
    deleteUser: async (parent, args, context, info) => {
      return context.dataSources.userApi.deleteUser(args.id)
    }
  }
};
