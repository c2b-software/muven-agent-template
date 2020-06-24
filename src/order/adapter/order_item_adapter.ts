import { BaseAdapter, ProductNotFoundException } from '@c2b/agent-commons';
import { MathUtils, OrderStatusEnum } from '@c2b/muven-commons';
import { OrderItem, ProductDao } from '@c2b/muven-core';
import { OrderProductDto } from '@c2b/__SDK-NAME__';

export class OrderItemAdapter extends BaseAdapter<OrderProductDto, OrderItem> {
    async convertToMuven(dto: OrderProductDto, additionalParams: ProductSoldAdapterAdditionalParams): Promise<OrderItem> {
        let entity: OrderItem;

        if (additionalParams?.orderItemEntity) {
            entity = additionalParams?.orderItemEntity;
        } else {
            entity = new OrderItem();
        }

        entity.idExternalChannel = dto.IdSku;
        entity.amount = Number(dto.Quantity);
        entity.price = MathUtils.round(Number(dto.Price) - Number(dto.Discount), 2);
        entity.listPrice = Number(dto.Price);
        entity.total = MathUtils.round(entity.price * entity.amount, 2);
        entity.discountValue = Number(dto.Discount);
        entity.status = additionalParams.orderStatus;

        const product = await additionalParams.productDao.getByExternalId(String(dto.IdSku));

        if (!product) {
            const idArray = [];
            idArray.push(String(dto.IdSku));
            throw new ProductNotFoundException(idArray, dto);
        }

        entity.idProduct = product.id;

        return entity;
    }
}

export interface ProductSoldAdapterAdditionalParams {
    orderStatus: OrderStatusEnum;
    orderItemEntity?: OrderItem;
    productDao: ProductDao;
}
