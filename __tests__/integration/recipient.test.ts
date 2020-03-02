import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';

import truncate from '../util/truncate';
import { createToken, createRecipient } from '../util/functions';

describe('Recipient integration', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create a recipient', async () => {
    const { token } = await createToken();
    const recipient = await (<Object>factory.attrs('Recipient'));

    const response = await request(app.server)
      .post('/recipients')
      .set('Authorization', `bearer ${token}`)
      .send(recipient);

    expect(response.body).toMatchObject(recipient);
  });

  it('should get recipients', async () => {
    const { recipient, token } = await createRecipient();

    const response = await request(app.server)
      .get('/recipients')
      .set('Authorization', `bearer ${token}`);
    expect(response.body).toMatchObject({ count: 1, rows: [{ ...recipient }] });
  });

  it('should get one recipient', async () => {
    const { recipient, token } = await createRecipient();

    const response = await request(app.server)
      .get(`/recipients/${recipient.id}`)
      .set('Authorization', `bearer ${token}`);
    expect(response.body).toMatchObject({ ...recipient });
  });

  it('should be able to update a recipient', async () => {
    const { recipient, token } = await createRecipient();

    const newRecipient = await (<Object>factory.attrs('Recipient'));
    const response = await request(app.server)
      .put(`/recipients/${recipient.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newRecipient);
    expect(response.body).toMatchObject(newRecipient);
  });

  it('should be able to delete a recipient', async () => {
    const { recipient, token } = await createRecipient();

    const response = await request(app.server)
      .delete(`/recipients/${recipient.id}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
