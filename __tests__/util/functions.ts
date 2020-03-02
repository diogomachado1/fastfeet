import request from 'supertest';

import app from '../../src/app';

import factory from '../factories';
import Recipient from '../../src/app/models/Recipient';

async function createToken() {
  const { body } = await request(app.server)
    .post('/sessions')
    .send({ email: 'admin@fastfeet.com', password: '123456' });
  return body;
}

async function createRecipient() {
  const { token } = await createToken();
  const recipient = await <Object>factory.attrs('Recipient');

  const response = await request(app.server)
    .post('/recipients')
    .set('Authorization', `bearer ${token}`)
    .send(recipient);
  return {recipient: <Recipient>response.body, token};
}

export {
  createToken,
  createRecipient
};
