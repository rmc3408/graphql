import { checkIsLoggedIn } from '../login/auth-utils';

export const postResolvers = {
  Query: {
    getPost: async (parent, args, context, info) => {
      const data = await context.dataSources.postApi.getPost(args.id);
      return data;
    },
    getPosts: async (parent, args, context, info) => {
      const data = await context.dataSources.postApi.getPosts(args.input);
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
    comment: async (parent, args, context, info) => {
      const loaderData = await context.dataSources.commentApi.batchLoadById(parent.id);
      return loaderData;
    },
  },
  Mutation: {
    createPost: async (parent, args, context, info) => {
      //checkIsLoggedIn(context.loggedUserID);
      args.data.userId = context.loggedUserID;
      return context.dataSources.postApi.createPost(args.data);
    },
    patchPost: async (parent, args, context, info) => {
      //checkIsLoggedIn(context.loggedUserID);
      return context.dataSources.postApi.updatePost(args.id, args.data);
    },
    deletePost: async (parent, args, context, info) => {
      //checkIsLoggedIn(context.loggedUserID);
      return context.dataSources.postApi.deletePost(args.id);
    },
  },
};
