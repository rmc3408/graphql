import { RESTDataSource } from "apollo-datasource-rest";
import DataLoader from "dataloader";
import { creatingPostFunction, updatingPostFunction, deletingPostFunction } from './utils'

class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.POSTS_URL;
    this.dataLoader = new DataLoader(async (ids) => {

      const urlQuery = ids.join('&userId=');
      const data = await this.getPosts('?userId=' + urlQuery);
    
      const mappedUserIDS = ids.map((id)=> {
        const matchedPosts = data.filter(post => post.userId === id)
        return matchedPosts;
      })
      //console.log(urlQuery)
      return mappedUserIDS;
    })    
  }

  async getPosts(url = {}) {
    return this.get('', url, { cacheOptions: { ttl: 60 }});
  }

  async getPost(id) {
    return this.get(id, undefined, { cacheOptions: { ttl: 60 }});
  }

  async createPost(data) {
    return creatingPostFunction(data, this);
  }

  async updatePost(id, data) {
    return updatingPostFunction(id, data, this);
  }

  async deletePost(id) {
    return deletingPostFunction(id, this);
  }
}

export default PostsApi;
