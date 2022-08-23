import { RESTDataSource } from "apollo-datasource-rest";
import { postDataLoader } from "./dataloaders";

class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.POSTS_URL;
    this.dataLoader = postDataLoader(this.getPosts.bind(this))    
  }

  async getPosts(url = {}) {
    return this.get('/', url, { cacheOptions: { ttl: 60 }});
  }

  async getPost(id) {
    return this.get('/' + id, undefined, { cacheOptions: { ttl: 60 }});
  }
}

export default PostsApi;
