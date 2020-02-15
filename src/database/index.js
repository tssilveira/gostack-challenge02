import Sequelize from 'sequelize';

import User from '../app/models/User';
import Destinatario from '../app/models/Destinatario';

import databaseConfig from '../config/database';

const models = [User, Destinatario];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
