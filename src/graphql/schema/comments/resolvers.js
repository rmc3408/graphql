import { PubSub, withFilter } from 'graphql-subscriptions';
import { checkIsLoggedIn } from '../login/auth-utils';

export const pubSub = new PubSub();

export const commentResolvers = {
  Query: {
    getComment: async (parent, args, context, info) => {
      const dataRaw = await context.dataSources.commentApi.getOne(args.id);
      const data = context.dataSources.commentApi.restoreDateFromDB(dataRaw[0]);
      return data;
    },
    getComments: async (parent, args, context, info) => {
      const data = await context.dataSources.commentApi.getAll();
      return data;
    },
  },
  Comment: {
    user: async (parent, args, context, info) => {
      const loaderData = await context.dataSources.userApi.dataLoader.load(parent.user_id);
      return loaderData;
    },
  },
  Mutation: {
    createComment: async (parent, args, context, info) => {
      checkIsLoggedIn(context.loggedUserID);
      const newComment = { userId: context.loggedUserID, ...args.data };
      return await context.dataSources.commentApi.createCommentFunction(newComment);
    },
  },
  Subscription: {
    onCreatedComment: {
      subscribe: withFilter(
        (parent, args, context) => {
          checkIsLoggedIn(context.loggedUserID);
          return pubSub.asyncIterator(['ON_CREATED', 'ON_EXIST']);
        },
        (payload, args, context) => {
          const postOwnerIsLoggedUser = payload.onCreatedComment.user_id === context.loggedUserID;
          const newPostOwnUser = payload.postOwner && postOwnerIsLoggedUser;
          return newPostOwnUser;
        },
      ),
    },
  },
};
