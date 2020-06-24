import { BaseAdapter } from '@c2b/agent-commons';
import { Order, OrderPayment, Payment, PaymentChannel, PaymentDao, PaymentTypeEnum } from '@c2b/muven-core';
import { OrderStatusEnum, IBackEndInfo } from '@c2b/muven-commons';
import { OrderDto } from '@c2b/__SDK-NAME__';

export class OrderPaymentAdapter extends BaseAdapter<OrderDto, OrderPayment> {
    async convertToMuven(dto: OrderDto, additionalParams: OrderPaymentAdapterAdditionalParams): Promise<OrderPayment> {
        let entity: OrderPayment;

        if (additionalParams?.orderEntity?.payments?.length) {
            entity = additionalParams.orderEntity.payments[0];
        } else {
            entity = new OrderPayment();
        }

        entity.value = dto.Payments?.[0]?.Amount;
        // entity.idExternalChannel = dto.;
        // entity.details = dto.payments?.[0];
        // entity.nsuCode = dto.payments?.[0]?.authorization_id;

        const paymentDB = await additionalParams.paymentDao.getByExternalId(String(dto.Payments?.[0]?.Name));

        if (paymentDB) {
            if (additionalParams.backendInfo.needsPaymentAssociation && !paymentDB.idSource) {
                additionalParams.orderEntity.status = OrderStatusEnum.PendingAssignments;
            }
            
            entity.payment = paymentDB;
        } else {
            entity.payment = await this.convert(dto, additionalParams.orderEntity.idChannel);

            if (additionalParams.backendInfo.needsPaymentAssociation) {
                additionalParams.orderEntity.status = OrderStatusEnum.PendingAssignments;
            }
        }

        return entity;
    }

    private convert(dto: OrderDto, idChannel: number): Payment {
        const entity = new Payment();

        entity.name = dto.Payments?.[0]?.Name;
        entity.isActive = true;

        const paymentChannel = new PaymentChannel();

        paymentChannel.idExternalChannel = dto.Payments?.[0]?.Name;
        paymentChannel.idChannel = idChannel;
        paymentChannel.isActive = entity.isActive;

        entity.channels = [
            paymentChannel,
        ];

        return entity;
    }
}

interface OrderPaymentAdapterAdditionalParams {
    orderEntity: Order;
    paymentDao: PaymentDao;
    backendInfo: IBackEndInfo;
}
