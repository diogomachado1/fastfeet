import request from 'supertest';

import app from '../../src/app';

import factory from '../factories';
import Recipient from '../../src/app/models/Recipient';
import Deliveryman from '../../src/app/models/Deliveryman';

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

async function createDeliveryman(): Promise<{
  token: string;
  deliveryman: Deliveryman;
}> {
  const { token } = await createToken();
  const deliveryman = (await factory.attrs('Deliveryman', {
    id: 1,
  })) as Deliveryman;

  const response = await request(app.server)
    .post('/Deliverymen')
    .set('Authorization', `bearer ${token}`)
    .send(deliveryman);
  return { deliveryman: response.body as Deliveryman, token };
}

export { createToken, createRecipient, createDeliveryman };
