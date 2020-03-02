import { Model ,STRING, VIRTUAL } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model{
  public id!: number;
  public name: string;
  public email: string;
  public password: string;
  public password_hash: string;

  static associate;
  static initModel(sequelize) {
    this.init(
      {
        name: STRING,
        email: STRING,
        password: VIRTUAL,
        password_hash: STRING,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async (user:User) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static async getByEmail(email){
    return this.findOne({
      where: {
        email,
      },
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
