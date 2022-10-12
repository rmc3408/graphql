import { SQLDataSource } from 'datasource-sql';
import DataLoader from 'dataloader';

export class KnexDatasource extends SQLDataSource {
  constructor(dbconnection) {
    super(dbconnection);
    this._loader = new DataLoader(async (ids) => this.batchCallback(ids));
  }

  async batchLoadById(id) {
    return this._loader.load(id);
  }

  async batchCallback(ids) {
    return ids;
  }
}