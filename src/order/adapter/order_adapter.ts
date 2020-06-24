import { BaseOrderAdapter, ConvertCompleteOptions } from "@c2b/agent-commons";
import { OrderDto, OrderInvoiceDto, OrderShipmentDto } from "@c2b/__SDK-NAME__";
import { Order } from "@c2b/muven-core";
import { IntegrationSourceEnum, OrderStatusEnum as MuvenOrderStatusEnum, AddressTypeEnum, IBackEndInfo, EntityEnum, AuditStatusEnum, AuditSeverityEnum, OrderStatusEnum, MathUtils } from "@c2b/muven-commons";
import { ObjectUtils } from "@c2b/commons";
import moment from "moment";
import { CustomerAdapter } from "./customer_adapter";
import { OrderAddressAdapter } from "./order_address_adapter";
import { OrderPaymentAdapter } from "./order_payment_adapter";
import { OrderShipmentAdapter } from "./order_shipment_adapter";
import { AuditInstance } from "@c2b/muven-audit-core";
import { OrderItemAdapter } from "./order_item_adapter";

export class OrderAdapter extends BaseOrderAdapter<OrderDto> {
    async convertToMuven(dto: OrderDto, additionalParams: OrderAdapterAdditionalParams): Promise<Order> {
        throw new Error("Method not implemented.");
    }

    async convertToMuvenComplete(entity: Order, dto: OrderDto, options: ConvertCompleteOptions): Promise<Order> {
        
        const backendInfo = await options.muvenConfigDao.getBackEndInfo();

        entity = this.convertOrderRoot(entity, dto, options);

        //
        // Order Addresses
        //
        entity = await this.convertOrderAddresses(entity, dto, options);
        //

        //
        // Order Payment
        //
        entity = await this.convertOrderPayments(entity, dto, options, backendInfo);
        //

        //
        // Order Items
        //
        entity = await this.convertOrderItems(entity, dto, options);
        //

        //
        // Order Invoice
        //
        entity = await this.convertOrderInvoice(entity, dto, options, backendInfo);
        //

        //
        // Order Customer
        //
        entity = await this.convertOrderCustomer(entity, dto, options);
        //

        //
        // Additional Operations
        //
        entity = this.prorateItemsDiscountValue(entity);
        //

        return entity;
    }

    convertInvoiceData(order: Order): OrderInvoiceDto {
        throw new Error("Method not implemented.");
    }

    convertShipmentData(order: Order): OrderShipmentDto{
        throw new Error("Method not implemented.");
    }

    convertOrderRoot(entity: Order, dto: OrderDto, options: ConvertCompleteOptions): Order {
        throw new Error("Method not implemented.");
    }

    async convertOrderCustomer(entity: Order, dto: OrderDto, options: ConvertCompleteOptions): Promise<Order> {
        let customer = await new CustomerAdapter().convertFromOrder(dto, entity.idChannel);
        const customerDB = await options.customerDao.getByExternalId(customer.idExternalChannel);

        if (customerDB) {
            customer = customerDB;
        }

        entity.customer = customer;

        return entity;
    }

    async convertOrderAddresses(entity: Order, dto: OrderDto, options: ConvertCompleteOptions): Promise<Order> {
        const orderAddressesEntity = [];
        orderAddressesEntity.push(await new OrderAddressAdapter().convertToMuven(dto));
        entity.addresses = orderAddressesEntity;

        return entity;
    }

    async convertOrderPayments(entity: Order, dto:OrderDto, options: ConvertCompleteOptions, backendInfo?: IBackEndInfo): Promise<Order> {
        if (!backendInfo) {
            backendInfo = await options.muvenConfigDao.getBackEndInfo();
        }

        const payment = await new OrderPaymentAdapter().convertToMuven(dto, { orderEntity: entity, paymentDao: options.paymentDao, backendInfo });
        entity.payments = [
            payment,
        ];
        
        return entity;
    }

    async convertOrderInvoice(entity: Order, dto: OrderDto, options: ConvertCompleteOptions, backendInfo?: IBackEndInfo): Promise<Order> {
        if (!backendInfo) {
            backendInfo = await options.muvenConfigDao.getBackEndInfo();
        }

        const invoice = await new OrderShipmentAdapter().convertToMuven(dto, {
            orderEntity: entity,
            deliveryCompanyDao: options.deliveryCompanyDao,
            backendInfo,
        });
        entity.invoices = [
            invoice
        ];

        return entity;
    }

    async convertOrderItems(entity: Order, dto: OrderDto, options: ConvertCompleteOptions): Promise<Order> {
        if (dto.Products) {
            for (let i = 0; i < dto.Products.length; i++) {
                const itemAuditInstance = new AuditInstance({
                    entity: EntityEnum.Order,
                    modificationSource: IntegrationSourceEnum.Channel,
                    description: `Obtenção de detalhe de item na __NAME__ - Id Produto: ${dto.Products[i].IdSku}`,
                    status: AuditStatusEnum.COMPLETED,
                    severity: AuditSeverityEnum.LOW,
                    additionalData: {
                        horaInicio: new Date().toISOString()
                    }
                });

                try {

                    let existingOrderItemEntity = entity.items?.find((ie) => ie.idExternalChannel === dto.Products[i].IdSku);
                    if (existingOrderItemEntity) {
                        existingOrderItemEntity = await new OrderItemAdapter().convertToMuven(
                            dto.Products[i],
                            {
                                orderItemEntity: existingOrderItemEntity,
                                orderStatus: entity.status,
                                productDao: options.productDao,
                            }
                        );
                    } else {
                        const itemEntity = await new OrderItemAdapter().convertToMuven(
                            dto.Products[i],
                            {
                                orderStatus: entity.status,
                                productDao: options.productDao,
                            }
                        );
    
                        entity.items.push(itemEntity);

                        itemAuditInstance.additionalData.horaFim = new Date().toISOString();
                        itemAuditInstance.additionalData.output = ObjectUtils.removeCircular(itemEntity);
                        options.itemsAuditInstances.push(itemAuditInstance);
                    }
                } catch (error) {
                    if (error.constructor.name === "ProductNotFoundException") {
                        entity.status = OrderStatusEnum.Error;

                        itemAuditInstance.additionalData.horaFim = new Date().toISOString();
                        itemAuditInstance.status = AuditStatusEnum.ERROR;
                        itemAuditInstance.severity = AuditSeverityEnum.MEDIUM;
                        itemAuditInstance.additionalData = {
                            output: "O item do pedido não foi encontrado no Muven",
                            idProdutoNaoEncontrado: dto.Products[i].IdSku,
                        };
                        options.itemsAuditInstances.push(itemAuditInstance);
                    }
                }
            }
        }

        return entity;
    }

    prorateItemsDiscountValue(order: Order): Order {
        if (order.items && order.discountValue) {
            for (const item of order.items) {
                order.discountValue += MathUtils.round(item.discountValue * item.amount);
            }
        }

        return order;
    }
}

interface OrderAdapterAdditionalParams {
    idChannel: number;
    modificationSource: IntegrationSourceEnum;
    existentOrder: Order;
}