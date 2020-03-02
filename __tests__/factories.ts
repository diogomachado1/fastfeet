import faker from 'faker';
import factory from 'factory-girl';
import Recipient from '../src/app/models/Recipient';
import User from '../src/app/models/User';

factory.define('Recipient', Recipient, {
  name: faker.name.findName(),
  street: faker.address.streetName(),
  number: faker.random.number({max: 10000}).toString(),
  addressComplement: faker.random.number({max: 10000}).toString(),
  city: faker.address.city(),
  state: faker.address.stateAbbr(),
  cep: faker.address.zipCode()
});

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export default factory;
