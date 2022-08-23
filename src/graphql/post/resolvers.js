//import { mockPost } from '../mockData';


export const postResolvers = {
  Query: {
    getPost: async (parent, args, context, info) => {
      const data = await context.dataSources.postApi.getPost(args.id);
      //const convData = await data.json();
      
      // if (Math.random() > 0.5) {
      //   return {
      //     statusCode: 500,
      //     message: 'Post took too long',
      //     timeout: 50,
      //   };
      // }
      
      // if (!convData.id) {
      //   return {
      //     statusCode: 404,
      //     message: 'Post not found',
      //     postId: args.id
      //   };
      // }

      return data;
    },
    getPosts: async (parent, args, context, info) => {
      //console.log(args.input)
      //const filterArgsPosts = new URLSearchParams(args.input);
      //console.log(filterArgsPosts.toString())
      //const data = await context.fetchPosts('/?' + filterArgsPosts);
      const data = await context.dataSources.postApi.getPosts(args.input)      
      return data;
    },
  },
  Post: {
    unixTimestamp: (parent, args, context, info) => {
      //console.log(parent.createdAt);
      const newTime = new Date(parent.createdAt).getSeconds();
      return newTime;
    },
    user: async (parent, args, context, info) => {
    
      // const response = await context.fetchUsers('/' + parent.userId);
      // return response.json()
      
      const loaderData = await context.userDataLoader.load(parent.userId); //Remove from array
      //console.log(typeof loaderData) //STRING or OBJECT
      return loaderData;
    },
  },
  // PostResult: {
  //   __resolveType: (obj) => {
  //     if (typeof obj.postId !== 'undefined') return "PostNotfoundError";
  //     if (typeof obj.timeout !== 'undefined') return "PostTimeOutError";
  //     if (typeof obj.id !== 'undefined') return "Post";
  //     return null;
  //   },
  // },
  // PostError: {
  //   __resolveType: (obj) => {
  //     if (typeof obj.postId !== 'undefined') return "PostNotfoundError";
  //     if (typeof obj.timeout !== 'undefined') return "PostTimeOutError";
  //     return null;
  //   },
  // },
};


