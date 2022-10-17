import { checkIsLoggedIn } from './auth-utils';

export const loginResolvers = {
  SignIn: {},
  Mutation: {
    signInUser: async (parent, args, context, info) => {
      return context.dataSources.loginApi.createLoginUser(args.data);
    },
    signOutUser: async (parent, args, context, info) => {
      checkIsLoggedIn(context.loggedUserID);
      return context.dataSources.loginApi.logoutUser(args.userName);
    },
  },
};
