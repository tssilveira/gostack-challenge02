import Sequelize, { Model } from 'sequelize';

class Destinatario extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        rua: Sequelize.STRING,
        numero: Sequelize.INTEGER,
        complemento: Sequelize.STRING,
        estado: Sequelize.STRING,
        cidade: Sequelize.STRING,
        cep: Sequelize.STRING
      },
      {
        sequelize,
        tableName: 'recepients'
      }
    );

    return this;
  }
}
export default Destinatario;
