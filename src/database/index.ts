import { Sequelize } from 'sequelize';

import * as databaseConfig from '../config/database.js';

import User from '../app/models/User';
import Recipients from '../app/models/Recipient';

const models = [User, Recipients];

class Database {
  public connection: Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.initModel(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  close(): void {
    this.connection.close();
  }
}

export default new Database();
