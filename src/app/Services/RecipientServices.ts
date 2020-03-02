import Recipients from "../models/Recipient";
import NotFoundError from "../Error/NotFoundError";
import RecipientValidator from "../Validators/RecipientValidator";
import PaginationValidator from "../Validators/PaginationValidator";


class RecipientServices {
  async getMany(payload){
    const { page } = await PaginationValidator.paginationValidate(
      payload
    );

    return Recipients.getAll(page,10)
  }

  async verifyAndGetOne(id){
    const recipient = await Recipients.getOne(id);
    if (!recipient) {
      throw new NotFoundError('Recipient');
    }
    return recipient;
  }

  async create(payload){
    const recipientValidated = await RecipientValidator.storeValidate(payload)

    const recipient = await Recipients.create(recipientValidated);

    return recipient.get();
  }

  async update(payload,id){
    const recipientValidated = await RecipientValidator.updateValidate(payload)

    const recipient = await this.verifyAndGetOne(id);

    const recipientSaved = await recipient.update(recipientValidated);

    return recipientSaved;
  }

  async delete(id){
    const recipient = await this.verifyAndGetOne(id);

    recipient.destroy();
  }
}

export default new RecipientServices();
