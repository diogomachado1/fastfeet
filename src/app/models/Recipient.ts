import { Model, STRING } from 'sequelize';

class Recipient extends Model {
  public id!: number;
  public name: string;
  public street: string;
  public number: string;
  public addressComplement: string;
  public city: string;
  public state: string;
  public cep: string;
  static attributes = [
    'id',
    'name',
    'street',
    'number',
    'addressComplement',
    'city',
    'state',
    'cep',
    'updatedAt',
    'createdAt',
  ];

  static associate;
  static initModel(sequelize) {
    this.init(
      {
        name: STRING,
        street: STRING,
        number: STRING,
        addressComplement: STRING,
        city: STRING,
        state: STRING,
        cep: STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static async getAll(page,limit){
    return this.findAndCountAll({
      attributes: this.attributes,
      limit,
      offset: (page - 1) * limit,
    });
  }

  static async getOne(id){
    return this.findByPk(id, {
      attributes: this.attributes,
    })
  }
}

export default Recipient;
