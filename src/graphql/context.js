import fetch from 'node-fetch';
import { getPosts } from './post/utils';
import { userDataLoader } from './user/dataloaders';
import { getUsers } from './user/utils';

export const context = () => {
  return {
    userDataLoader: userDataLoader(getUsers(fetch)),
    fetchUsers: getUsers(fetch),
    fetchPosts: getPosts(fetch)
  };
};
