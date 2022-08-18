import fetch from 'node-fetch';
import { postDataLoader } from './post/dataloaders';
import { getPosts } from './post/utils';
import { userDataLoader } from './user/dataloaders';
import { getUsers } from './user/utils';

export const context = () => {
  return {
    userDataLoader: userDataLoader(getUsers(fetch)),
    postDataLoader: postDataLoader(getPosts(fetch)),
    fetchUsers: getUsers(fetch),
    fetchPosts: getPosts(fetch)
  };
};
