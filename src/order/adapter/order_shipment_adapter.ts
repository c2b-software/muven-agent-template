import { BaseAdapter } from "@c2b/agent-commons";
import { IBackEndInfo, OrderStatusEnum } from "@c2b/muven-commons";
import { DeliveryCompany, DeliveryCompanyChannel, DeliveryCompanyDao, Order, OrderInvoice } from "@c2b/muven-core";
import moment from "moment";
import { OrderDto } from "@c2b/__SDK-NAME__";

export class OrderShipmentAdapter extends BaseAdapter<OrderDto, OrderInvoice> {
    async convertToMuven(dto: OrderDto, additionalParams?: ShipmentAdapterAdditionalParams): Promise<OrderInvoice> {
        let entity: OrderInvoice;

        if (additionalParams?.orderEntity?.invoices?.length) {
            entity = additionalParams.orderEntity.invoices[0];
        } else {
            entity = new OrderInvoice();
        }

        entity.freightTotal = Number(dto.TotalFreight);
        entity.shippingEstimateDate = dto.ShippedEstimatedDelivery.toString();
        entity.shippingEstimateDays = dto.ShippedEstimatedDelivery ? moment(dto.ShippedEstimatedDelivery).diff(moment(Date.now()), 'days') : undefined;
        
        const deliveryCompanyDB = await additionalParams.deliveryCompanyDao.getByExternalId(dto.ShippedCarrierName);

        if (deliveryCompanyDB) {
            entity.deliveryCompany = deliveryCompanyDB;
        } else {
            entity.deliveryCompany = this.convertDeliveryCompany(dto, additionalParams.orderEntity.idChannel);

            if (additionalParams.backendInfo.needsDeliveryCompanyAssociation) {
                additionalParams.orderEntity.status = OrderStatusEnum.PendingAssignments;
            }
        }

        return entity;
    }

    private convertDeliveryCompany(dto:OrderDto, idChannel:number): DeliveryCompany {
        const entity = new DeliveryCompany();

        entity.name = dto.ShippedCarrierName;
        entity.isActive = true;
        
        const deliveryCompanyChannel = new DeliveryCompanyChannel();
        
        deliveryCompanyChannel.idExternalChannel = dto.ShippedCarrierName;
        deliveryCompanyChannel.idChannel = idChannel;
        deliveryCompanyChannel.isActive = true;
        
        entity.channels = [
            deliveryCompanyChannel,
        ];

        return entity;
    }
}

interface ShipmentAdapterAdditionalParams {
    orderEntity: Order;
    deliveryCompanyDao: DeliveryCompanyDao;
    backendInfo: IBackEndInfo;
}