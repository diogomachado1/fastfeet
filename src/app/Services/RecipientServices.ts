import NotFoundError from '../Error/NotFoundError';
import RecipientValidator from '../Validators/RecipientValidator';
import PaginationValidator from '../Validators/PaginationValidator';
import Recipient from '../models/Recipient';

interface ManyRecipient {
  count: number;
  rows: Recipient[];
}
class RecipientServices {
  async getMany(payload): Promise<ManyRecipient> {
    const { page } = await PaginationValidator.paginationValidate(payload);

    return Recipient.getAll(page, 10);
  }

  async verifyAndGetOne(id): Promise<Recipient> {
    const recipient = await Recipient.getOne(id);
    if (!recipient) {
      throw new NotFoundError('Recipient');
    }
    return recipient;
  }

  async create(payload): Promise<Recipient> {
    const recipientValidated = await RecipientValidator.storeValidate(payload);

    const recipient = await Recipient.create(recipientValidated);

    return recipient;
  }

  async update(payload, id): Promise<Recipient> {
    const recipientValidated = await RecipientValidator.updateValidate(payload);

    const recipient = await this.verifyAndGetOne(id);

    const recipientSaved = await recipient.update(recipientValidated);

    return recipientSaved;
  }

  async delete(id): Promise<void> {
    const recipient = await this.verifyAndGetOne(id);

    recipient.destroy();
  }
}

export default new RecipientServices();
