import RecipientValidator from '../../../src/app/Validators/RecipientValidator';

import factory from '../../factories';

describe('RecipientValidator', () => {
  it('methods should exist', async () => {
    expect(RecipientValidator.storeValidate).toBeTruthy();
    expect(RecipientValidator.updateValidate).toBeTruthy();
  });

  it('should Validate when create a recipient', async () => {
    const recipient = await factory.attrs('Recipient');
    const validatedRecipient = await RecipientValidator.storeValidate(
      recipient
    );
    expect(validatedRecipient).toEqual(recipient);
  });
  it('should have name when create a recipient', async () => {
    const recipient = await factory.attrs('Recipient', {
      name: undefined,
    });
    await expect(RecipientValidator.storeValidate(recipient)).rejects.toThrow(
      /name is a required field./
    );
  });
  it('should have name when create a recipient', async () => {
    const recipient = await factory.attrs('Recipient', {
      name: undefined,
    });
    await expect(RecipientValidator.storeValidate(recipient)).rejects.toThrow(
      /name is a required field./
    );
  });

  it('should have street when create a recipient', async () => {
    const recipient = await factory.attrs('Recipient', {
      street: undefined,
    });
    await expect(RecipientValidator.storeValidate(recipient)).rejects.toThrow(
      /street is a required field./
    );
  });

  it('should have number when create a recipient', async () => {
    const recipient = await factory.attrs('Recipient', {
      number: undefined,
    });
    await expect(RecipientValidator.storeValidate(recipient)).rejects.toThrow(
      /number is a required field./
    );
  });

  it('should have addressComplement when create a recipient', async () => {
    const recipient = await factory.attrs('Recipient', {
      addressComplement: undefined,
    });
    await expect(RecipientValidator.storeValidate(recipient)).rejects.toThrow(
      /addressComplement is a required field./
    );
  });

  it('should have city when create a recipient', async () => {
    const recipient = await factory.attrs('Recipient', {
      city: undefined,
    });
    await expect(RecipientValidator.storeValidate(recipient)).rejects.toThrow(
      /city is a required field./
    );
  });

  it('should have state when create a recipient', async () => {
    const recipient = await factory.attrs('Recipient', {
      state: undefined,
    });
    await expect(RecipientValidator.storeValidate(recipient)).rejects.toThrow(
      /state is a required field./
    );
  });

  it('should have cep when create a recipient', async () => {
    const recipient = await factory.attrs('Recipient', {
      cep: undefined,
    });
    await expect(RecipientValidator.storeValidate(recipient)).rejects.toThrow(
      /cep is a required field./
    );
  });

  it('should Validate when update a recipient', async () => {
    const recipient = await factory.attrs('Recipient');
    const validatedRecipient = await RecipientValidator.updateValidate(
      recipient
    );
    expect(validatedRecipient).toEqual(recipient);
  });
});
