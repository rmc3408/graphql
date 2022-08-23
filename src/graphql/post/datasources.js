import { RESTDataSource } from "apollo-datasource-rest";
import DataLoader from "dataloader";

class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.POSTS_URL;
    this.dataLoader = new DataLoader(async (ids) => {

      const urlQuery = ids.join('&userId=');
      const data = await this.getPosts('?userId=' + urlQuery);
    
      const mappedUserIDS = ids.map((id)=> {
        const matchedPost = data.filter(post => post.userId === id)
        return matchedPost;
      })
      console.log(urlQuery)
      return mappedUserIDS;
    })    
  }

  async getPosts(url = {}) {
    return this.get('', url, { cacheOptions: { ttl: 60 }});
  }

  async getPost(id) {
    return this.get(id, undefined, { cacheOptions: { ttl: 60 }});
  }
}

export default PostsApi;
