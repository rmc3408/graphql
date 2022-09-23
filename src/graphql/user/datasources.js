import { RESTDataSource } from "apollo-datasource-rest";
import DataLoader from "dataloader";
import { creatingUserFunction, updatingUserFunction, deletingUserFunction } from './utils'

class UsersApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.USERS_URL;
    this.dataLoader = new DataLoader(async (ids) => {
      const urlQuery = ids.join('&id=');
      const data = await this.getUsers('?id=' + urlQuery);
    
      const mappedIDS = ids.map((id)=> {
        const matchedID = data.find(user => user.id === id)
        return matchedID;
      })
      //console.log('UserAPI call', urlQuery);
      return mappedIDS;
    })    
  }

  async getUsers(url = {}) {
    return this.get('', url, { cacheOptions: { ttl: 60 }});
  }

  async getUser(id) {
    return this.get(id, undefined, { cacheOptions: { ttl: 60 }});
  }

  async createUser(data) {
    return creatingUserFunction(data, this);
  }

  async updateUser(id, data) {
    return updatingUserFunction(id, data, this);
  }

  async deleteUser(id) {
    return deletingUserFunction(id, this);
  }
}

export default UsersApi;
