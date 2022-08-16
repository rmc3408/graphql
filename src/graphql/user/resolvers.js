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
      const data = await context.fetchUsers();
      return data.json();
    },
  },
};
