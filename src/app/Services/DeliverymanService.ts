import NotFoundError from '../Error/NotFoundError';
import DeliverymanValidator from '../Validators/DeliverymanValidator';
import PaginationValidator from '../Validators/PaginationValidator';
import Deliveryman from '../models/Deliveryman';

interface ManyDeliveryman {
  count: number;
  rows: Deliveryman[];
}
class DeliverymanServices {
  async getMany(payload): Promise<ManyDeliveryman> {
    const { page } = await PaginationValidator.paginationValidate(payload);

    return Deliveryman.getAll(page, 10);
  }

  async verifyAndGetOne(id): Promise<Deliveryman> {
    const recipient = await Deliveryman.getOne(id);
    if (!recipient) {
      throw new NotFoundError('Deliveryman');
    }
    return recipient;
  }

  async create(payload): Promise<Deliveryman> {
    const recipientValidated = await DeliverymanValidator.storeValidate(
      payload
    );

    const recipient = await Deliveryman.create(recipientValidated);

    return recipient;
  }

  async update(payload, id): Promise<Deliveryman> {
    const recipientValidated = await DeliverymanValidator.updateValidate(
      payload
    );

    const recipient = await this.verifyAndGetOne(id);

    const recipientSaved = await recipient.update(recipientValidated);

    return recipientSaved;
  }

  async delete(id): Promise<void> {
    const recipient = await this.verifyAndGetOne(id);

    recipient.destroy();
  }
}

export default new DeliverymanServices();
