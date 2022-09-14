import { RESTDataSource } from "apollo-datasource-rest";
import { createLoginUserFunction } from "./utils";

class LoginApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.USERS_URL;  
  }

  async createLoginUser(data) { 
    return createLoginUserFunction(data, this)
  }
}

export default LoginApi;
