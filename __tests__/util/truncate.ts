import bcrypt from 'bcryptjs';
import database from '../../src/database';

export default async function truncate(confirmEmail = true) {
  await Promise.all([
    ...Object.keys(database.connection.models).map(key => {
      return database.connection.models[key].destroy({
        truncate: true,
        force: true,
      });
    }),
  ]);
  await database.connection.models.User.create(
    {
      name: 'Distribuidora FastFeet',
      email: 'admin@fastfeet.com',
      password_hash: bcrypt.hashSync('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
  )
}
