
export const loginResolvers = {
  SignIn: {},
  Mutation: {
    signInUser: async (parent, args, context, info) => {
      return context.dataSources.loginApi.createLoginUser(args.data)
    },
  }
};
