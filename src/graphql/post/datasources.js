import { RESTDataSource } from "apollo-datasource-rest";

class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.POSTS_URL

  }


}

export default PostsApi;
