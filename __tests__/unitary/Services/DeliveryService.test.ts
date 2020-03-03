import Deliveryman from '../../../src/app/models/Deliveryman';
import DeliverymanService from '../../../src/app/Services/DeliverymanService';
import DeliverymanValidator from '../../../src/app/Validators/DeliverymanValidator';
import factory from '../../factories';
import PaginationValidator from '../../../src/app/Validators/PaginationValidator';

jest.mock('../../../src/app/Validators/DeliverymanValidator');

jest.mock('../../../src/app/models/Deliveryman');

const mDeliveryman = Deliveryman as jest.Mocked<typeof Deliveryman>;
const mDeliverymanValidator = DeliverymanValidator as jest.Mocked<
  typeof DeliverymanValidator
>;
const mPaginationValidator = PaginationValidator as jest.Mocked<
  typeof PaginationValidator
>;

mDeliveryman.create = jest.fn(mDeliveryman.create);
// @ts-ignore
mDeliveryman.findAndCountAll = jest.fn(mDeliveryman.findAndCountAll);
mDeliveryman.prototype.update = jest.fn(mDeliveryman.prototype.update);
mDeliveryman.prototype.destroy = jest.fn(mDeliveryman.prototype.destroy);
mDeliveryman.findByPk = jest.fn(mDeliveryman.findByPk);
mDeliverymanValidator.storeValidate = jest.fn(
  mDeliverymanValidator.storeValidate
);
mDeliverymanValidator.updateValidate = jest.fn(
  mDeliverymanValidator.updateValidate
);
mDeliverymanValidator.updateValidate = jest.fn(
  mDeliverymanValidator.updateValidate
);
mPaginationValidator.paginationValidate = jest.fn(
  mPaginationValidator.paginationValidate
);
describe('DeliverymanService', () => {
  it('methods should exist', async () => {
    expect(DeliverymanService.create).toBeTruthy();
    expect(DeliverymanService.verifyAndGetOne).toBeTruthy();
    expect(DeliverymanService.update).toBeTruthy();
    expect(DeliverymanService.getMany).toBeTruthy();
    expect(DeliverymanService.delete).toBeTruthy();
  });
  it('should create Deliveryman', async () => {
    const deliveryman = (await factory.attrs('Deliveryman')) as Deliveryman;
    // @ts-ignore
    mDeliveryman.create.mockResolvedValue(deliveryman);
    const response = await DeliverymanService.create(deliveryman);

    expect(mDeliverymanValidator.storeValidate).toHaveBeenCalledTimes(1);
    expect(mDeliveryman.create).toHaveBeenCalledTimes(1);
    expect(response).toBe(deliveryman);
  });

  it('should verifyAndGetOne Deliveryman', async () => {
    const deliveryman = (await factory.attrs('Deliveryman', {
      id: 1,
    })) as Deliveryman;
    mDeliveryman.findByPk.mockResolvedValue(deliveryman);
    const response = await DeliverymanService.verifyAndGetOne(1);
    expect(mDeliveryman.findByPk).toHaveBeenCalledTimes(1);
    expect(response).toBe(deliveryman);
  });

  it('should get error when not found Deliveryman in verifyAndGetOne', async () => {
    mDeliveryman.findByPk.mockResolvedValue(undefined);
    await expect(DeliverymanService.verifyAndGetOne(1)).rejects.toThrow(
      /Deliveryman not found/
    );
  });

  // it('should getMany Deliveryman', async () => {
  //   const deliveryman = await (<Promise<Deliveryman>>(
  //     factory.attrs('Deliveryman', { id: 1 })
  //   ));
  //   mDeliveryman.findByPk.mockResolvedValue(deliveryman);
  //   const response = await DeliverymanService.verifyAndGetOne(1);
  //   expect(mDeliveryman.findByPk).toHaveBeenCalledTimes(1);
  //   expect(response).toBe(deliveryman);
  // });

  it('should update Deliveryman', async () => {
    const deliverymanFac = (await factory.attrs('Deliveryman')) as Deliveryman;
    const deliveryman = {
      ...deliverymanFac,
      update: mDeliveryman.prototype.update,
    } as Deliveryman;

    mDeliveryman.findByPk.mockResolvedValue(deliveryman);
    // @ts-ignore
    mDeliveryman.prototype.update.mockResolvedValue(deliveryman);

    const response = await DeliverymanService.update(deliveryman, 1);

    expect(mDeliveryman.findByPk).toHaveBeenCalledTimes(1);
    expect(mDeliverymanValidator.updateValidate).toHaveBeenCalledTimes(1);
    expect(mDeliveryman.prototype.update).toHaveBeenCalledTimes(1);
    expect(response).toBe(deliveryman);
  });

  it('should delete Deliveryman', async () => {
    const deliverymanFac = (await factory.attrs('Deliveryman')) as Deliveryman;
    const deliveryman = {
      ...deliverymanFac,
      destroy: mDeliveryman.prototype.destroy,
    } as Deliveryman;

    mDeliveryman.findByPk.mockResolvedValue(deliveryman);
    // @ts-ignore
    mDeliveryman.prototype.destroy.mockResolvedValue(deliveryman);

    await DeliverymanService.delete(1);

    expect(mDeliveryman.findByPk).toHaveBeenCalledTimes(1);
    expect(mDeliveryman.prototype.destroy).toHaveBeenCalledTimes(1);
  });
});
