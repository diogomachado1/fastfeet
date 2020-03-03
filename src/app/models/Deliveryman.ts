import { Model, STRING } from 'sequelize';
import File from './File';

class Deliveryman extends Model {
  public id!: number;

  public name: string;

  public email: string;

  public avatar_id: string;

  public avatar: File;

  static initModel(sequelize): typeof Deliveryman {
    this.init(
      {
        name: STRING,
        email: STRING,
      },
      {
        sequelize,
        tableName: 'deliverymen',
      }
    );
    return this;
  }

  static async getAll(
    page,
    limit
  ): Promise<{
    rows: Deliveryman[];
    count: number;
  }> {
    return this.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
    });
  }

  static async getOne(id): Promise<Deliveryman> {
    return this.findByPk(id);
  }

  static associate(models): void {
    this.belongsTo(models.File, {
      foreignKey: { field: 'avatar_id', name: 'avatarId' },
      as: 'avatar',
    });
  }
}

export default Deliveryman;
