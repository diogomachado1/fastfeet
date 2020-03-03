import bcrypt from 'bcryptjs';
import database from '../../src/database';

export default async function truncate(): Promise<void> {
  await Promise.all([
    ...Object.keys(database.connection.models).map(key => {
      return database.connection.models[key].destroy({
        truncate: true,
        force: true,
        cascade: true,
      });
    }),
  ]);
  await database.connection.models.User.create({
    name: 'Distribuidora FastFeet',
    email: 'admin@fastfeet.com',
    password_hash: bcrypt.hashSync('123456', 8),
    created_at: new Date(),
    updated_at: new Date(),
  });
  await database.connection.models.File.create({
    id: 1,
    name: 'test.png',
    path: '34e8jsd8ds7d34eu3hds.png',
    created_at: new Date(),
    updated_at: new Date(),
  });
}
