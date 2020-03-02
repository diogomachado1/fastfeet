import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('Session Create', () => {
  beforeEach(async () => {
    await truncate();
  });
  afterAll(async () => {
    app.close();
  });

  it('should be able to create session', async () => {
    const response = await request(app.server)
      .post('/sessions')
      .send({ email: 'admin@fastfeet.com', password: '123456' });

    expect(response.body).toHaveProperty('token');
  });

  it('should return error', async () => {
    const response = await request(app.server)
      .post('/sessions')
      .send({ email: 'admin@fastfeet.com', password: '1234567' });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/wrong email or password/);
  });

  it('should return error without token', async () => {
    const response = await request(app.server).get('/recipient');

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/Unauthorized/);
  });
});
