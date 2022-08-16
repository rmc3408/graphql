import fetch from 'node-fetch';

const USERS_URL = 'http://localhost:3000/users'
const POSTS_URL = 'http://localhost:3000/posts'

export const context = () => {
  return {
    fetchUsers: (id = "") => fetch(USERS_URL + id),
    fetchPosts: (id = "") => fetch(POSTS_URL + id)
  };
};
