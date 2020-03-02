import request from 'supertest';

import app from '../../src/app';

import factory from '../factories';
import Recipient from '../../src/app/models/Recipient';

async function createToken(): Promise<{
  token: string;
}> {
  const { body } = await request(app.server)
    .post('/sessions')
    .send({ email: 'admin@fastfeet.com', password: '123456' });
  return body;
}

async function createRecipient(): Promise<{
  token: string;
  recipient: Recipient;
}> {
  const { token } = await createToken();
  const recipient = (await factory.attrs('Recipient')) as Recipient;

  const response = await request(app.server)
    .post('/recipients')
    .set('Authorization', `bearer ${token}`)
    .send(recipient);
  return { recipient: response.body as Recipient, token };
}

export { createToken, createRecipient };
