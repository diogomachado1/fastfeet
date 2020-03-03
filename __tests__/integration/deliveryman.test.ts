import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';

import truncate from '../util/truncate';
import { createToken, createDeliveryman } from '../util/functions';
import Deliveryman from '../../src/app/models/Deliveryman';

describe('Deliveryman integration', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create a deliveryman', async () => {
    const { token } = await createToken();
    const deliveryman = (await factory.attrs('Deliveryman')) as Deliveryman;

    const response = await request(app.server)
      .post('/deliverymen')
      .set('Authorization', `bearer ${token}`)
      .send(deliveryman);

    expect(response.body).toMatchObject(deliveryman);
  });

  it('should get deliverymen', async () => {
    const { deliveryman, token } = await createDeliveryman();

    const response = await request(app.server)
      .get('/deliverymen')
      .set('Authorization', `bearer ${token}`);
    expect(response.body).toMatchObject({
      count: 1,
      rows: [{ ...deliveryman }],
    });
  });

  it('should get one deliveryman', async () => {
    const { deliveryman, token } = await createDeliveryman();

    const response = await request(app.server)
      .get(`/deliverymen/${deliveryman.id}`)
      .set('Authorization', `bearer ${token}`);
    expect(response.body).toMatchObject({ ...deliveryman });
  });

  it('should be able to update a deliveryman', async () => {
    const { deliveryman, token } = await createDeliveryman();

    const newDeliveryman = (await factory.attrs('Deliveryman')) as Deliveryman;
    const response = await request(app.server)
      .put(`/deliverymen/${deliveryman.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newDeliveryman);
    expect(response.body).toMatchObject(newDeliveryman);
  });

  it('should be able to delete a deliveryman', async () => {
    const { deliveryman, token } = await createDeliveryman();

    const response = await request(app.server)
      .delete(`/deliverymen/${deliveryman.id}`)
      .set('Authorization', `bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
