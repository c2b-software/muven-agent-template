import { BaseAdapter } from "@c2b/agent-commons";
import { AddressTypeEnum, OrderAddress } from "@c2b/muven-core";
import { OrderDto } from "@c2b/__SDK-NAME__";

export class OrderAddressAdapter extends BaseAdapter<OrderDto, OrderAddress> {
    async convertToMuven(dto: OrderDto): Promise<OrderAddress> {
        const entity = new OrderAddress();

        entity.city = dto.DeliveryAddressCity;
        entity.postalCode = dto.DeliveryAddressZipcode;
        entity.description = dto.DeliveryAddressAdditionalInfo;
        entity.state = dto.DeliveryAddressState;
        entity.number = dto.DeliveryAddressNumber;
        entity.complement = dto.DeliveryAddressReference;
        entity.neighborhood = dto.DeliveryAddressNeighborhood;
        entity.street = dto.DeliveryAddressStreet;
        entity.type = AddressTypeEnum.Both;

        return entity;
    }
}
