import { checkOwnership } from '../login/auth-utils';

export const userResolvers = {
  Query: {
    getUser: async (parent, args, context, info) => {
      checkOwnership(context.loggedUserID, args.id);
      const data = await context.dataSources.userApi.getUser(args.id);
      return data;
    },
    getUsers: async (parent, args, context, info) => {
      const data = await context.dataSources.userApi.getUsers(args.input);
      return data;
    },
  },
  User: {
    posts: async (parent, args, context, info) => {
      const loaderData = await context.dataSources.postApi.dataLoader.load(parent.id);
      return loaderData;
    },
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      return context.dataSources.userApi.createUser(args.data);
    },
    patchUser: async (parent, args, context, info) => {
      checkOwnership(context.loggedUserID, args.id);
      return context.dataSources.userApi.updateUser(args.id, args.data);
    },
    deleteUser: async (parent, args, context, info) => {
      checkOwnership(context.loggedUserID, args.id);
      return context.dataSources.userApi.deleteUser(args.id);
    },
  },
};
