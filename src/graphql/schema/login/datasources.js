import { RESTDataSource } from 'apollo-datasource-rest';
import { createLoginUserFunction, logOutUserFunction } from './utils';

class LoginApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.USERS_URL;
  }

  async createLoginUser(data) {
    return createLoginUserFunction(data, this);
  }
  async logoutUser(un) {
    return logOutUserFunction(un, this);
  }
}

export default LoginApi;
