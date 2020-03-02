import path from 'path';
import request from 'supertest';
import fs from 'fs';
import app from '../../src/app';

import truncate from '../util/truncate';
import { createToken } from '../util/functions';

describe('Session Create', () => {
  beforeEach(async () => {
    await truncate();
  });
  afterAll(async () => {
    app.close();
  });

  it('should be able to create a file', async () => {
    const { token } = await createToken();

    const response = await request(app.server)
      .post('/files')
      .set('Authorization', `bearer ${token}`)
      .attach(
        'file',
        path.resolve(__dirname, '..', 'util', 'uploads', 'test.png')
      );

    await fs.unlinkSync(
      path.resolve(__dirname, '..', '..', 'tmp', 'uploads', response.body.path)
    );
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
