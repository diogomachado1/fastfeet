import Recipient from '../../../src/app/models/Recipient';
import RecipientServices from '../../../src/app/Services/RecipientServices';
import RecipientValidator from '../../../src/app/Validators/RecipientValidator';
import factory from '../../factories';
import PaginationValidator from '../../../src/app/Validators/PaginationValidator';


jest.mock('../../../src/app/Validators/RecipientValidator');

jest.mock('../../../src/app/models/Recipient');

const mRecipient = Recipient as jest.Mocked<typeof Recipient>;
const mRecipientValidator = RecipientValidator as jest.Mocked<
  typeof RecipientValidator
>;
const mPaginationValidator = PaginationValidator as jest.Mocked<
  typeof PaginationValidator
>;

mRecipient.create = jest.fn(mRecipient.create);
//@ts-ignore
mRecipient.findAndCountAll = jest.fn(mRecipient.findAndCountAll);
mRecipient.prototype.update = jest.fn(mRecipient.prototype.update);
mRecipient.prototype.destroy = jest.fn(mRecipient.prototype.destroy);
mRecipient.findByPk = jest.fn(mRecipient.findByPk);
mRecipientValidator.storeValidate = jest.fn(mRecipientValidator.storeValidate);
mRecipientValidator.updateValidate = jest.fn(mRecipientValidator.updateValidate);
mRecipientValidator.updateValidate = jest.fn(mRecipientValidator.updateValidate);
mPaginationValidator.paginationValidate = jest.fn(mPaginationValidator.paginationValidate);
describe('RecipientServices', () => {
  it('methods should exist', async () => {
    expect(RecipientServices.create).toBeTruthy();
    expect(RecipientServices.verifyAndGetOne).toBeTruthy();
    expect(RecipientServices.update).toBeTruthy();
    expect(RecipientServices.getMany).toBeTruthy();
    expect(RecipientServices.delete).toBeTruthy();
  });
  it('should create Recipient', async () => {
    const recipient = await (<Promise<Recipient>>factory.attrs('Recipient'));
    recipient.get = () => recipient;
    //@ts-ignore
    mRecipient.create.mockResolvedValue(recipient);
    const response = await RecipientServices.create(recipient);

    expect(mRecipientValidator.storeValidate).toHaveBeenCalledTimes(1);
    expect(mRecipient.create).toHaveBeenCalledTimes(1);
    expect(response).toBe(recipient);
  });

  it('should verifyAndGetOne Recipient', async () => {
    const recipient = await (<Promise<Recipient>>(
      factory.attrs('Recipient', { id: 1 })
    ));
    mRecipient.findByPk.mockResolvedValue(recipient);
    const response = await RecipientServices.verifyAndGetOne(1);
    expect(mRecipient.findByPk).toHaveBeenCalledTimes(1);
    expect(response).toBe(recipient);
  });

  it('should get error when not found Recipient in verifyAndGetOne', async () => {
    mRecipient.findByPk.mockResolvedValue(undefined);
    await expect(RecipientServices.verifyAndGetOne(1)).rejects.toThrow(
      /Recipient not found/
    );
  });


  // it('should getMany Recipient', async () => {
  //   const recipient = await (<Promise<Recipient>>(
  //     factory.attrs('Recipient', { id: 1 })
  //   ));
  //   mRecipient.findByPk.mockResolvedValue(recipient);
  //   const response = await RecipientServices.verifyAndGetOne(1);
  //   expect(mRecipient.findByPk).toHaveBeenCalledTimes(1);
  //   expect(response).toBe(recipient);
  // });

  it('should update Recipient', async () => {
    const recipientFac = await  <Promise<Recipient>>factory.attrs('Recipient');
    const recipient = <Recipient>{
      ...recipientFac,
      update: mRecipient.prototype.update
    }

    mRecipient.findByPk.mockResolvedValue(recipient);
    //@ts-ignore
    mRecipient.prototype.update.mockResolvedValue(recipient);

    const response = await RecipientServices.update(recipient,1);

    expect(mRecipient.findByPk).toHaveBeenCalledTimes(1);
    expect(mRecipientValidator.updateValidate).toHaveBeenCalledTimes(1);
    expect(mRecipient.prototype.update).toHaveBeenCalledTimes(1);
    expect(response).toBe(recipient);
  });

  it('should delete Recipient', async () => {
    const recipientFac = await  <Promise<Recipient>>factory.attrs('Recipient');
    const recipient = <Recipient>{
      ...recipientFac,
      destroy: mRecipient.prototype.destroy
    }

    mRecipient.findByPk.mockResolvedValue(recipient);
    //@ts-ignore
    mRecipient.prototype.destroy.mockResolvedValue(recipient);

    await RecipientServices.delete(1);

    expect(mRecipient.findByPk).toHaveBeenCalledTimes(1);
    expect(mRecipient.prototype.destroy).toHaveBeenCalledTimes(1);
  });
  // it('should not create session when wrong email', async () => {
  //   mRecipient.findOne.mockResolvedValue(undefined)
  //   const createSession = RecipientServices.createSession({
  //     email: 'admin@fastfeett.com',
  //     password: '123456',
  //   });

  //   await expect(createSession).rejects.toThrow(
  //     /wrong email or password./
  //   );
  // });

  // it('should not create session when wrong password', async () => {
  //   const user = {
  //     id: 1,
  //     name: 'Distribuidora FastFeet',
  //     email: 'admin@fastfeet.com',
  //     password_hash: bcrypt.hashSync('123456', 8),
  //     checkPassword: mRecipient.prototype.checkPassword
  //   }
  //   mRecipient.findOne.mockResolvedValue(<Recipient>user)
  //   const createSession = RecipientServices.createSession({
  //     email: 'admin@fastfeet.com',
  //     password: '1234567',
  //   });

  //   await expect(createSession).rejects.toThrow(
  //     /wrong email or password./
  //   );
  // });
});
