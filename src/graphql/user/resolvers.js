//import { mockUser } from '../mockData';

export const userResolvers = {
  Query: {
    getUser: async (parent, args, context, info) => {
      //console.log(args)
      //const data = await context.fetch(USERS_URL + '/' + args.id);
      const data = await context.fetchUsers('/' + args.id);
      return data.json();
    },
    getUsers: async (parent, args, context, info) => {
      //console.log(context)
      //const data = await context.fetch(USERS_URL);
      const filterArgsPosts = new URLSearchParams(args.input)
      const data = await context.fetchUsers('/?' + filterArgsPosts);
      return data.json();
    },
  },
  User: {
    posts: async (parent, args, context, info) => {
      //const loaderData = await context.postDataLoader.load(parent.id); //Remove from array.
      //still receive array of posts per user
      const loaderData = await context.dataSources.postApi.dataloader.load(parent.id)
      //const loaderData = await context.dataSources.postApi.
      return loaderData;
    },
  },
};
