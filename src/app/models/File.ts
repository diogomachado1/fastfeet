import Sequelize, { Model } from 'sequelize';

class File extends Model {
  public id!: number;

  public name: string;

  public path: string;

  public url: string;

  static associate;

  static initModel(sequelize): typeof File {
    this.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get(): string {
            return `${process.env.FILES_URL}/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
