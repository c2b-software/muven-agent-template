import { OrderBaseService, agentAuditHandler, BaseHookEventBodyDto, AgentOperationEnum } from "@c2b/agent-commons";
import { OrderCompleteDto, EntityHookEventDto, Sdk__NAME__Facade } from "@c2b/__SDK-NAME__";
import { OrderAdapter } from "../adapter/order_adapter";
import { MuvenRequestOptions, AuditStatusEnum, AuditSeverityEnum, EntityEnum, ModificationSourceEnum, OrderStatusEnum } from "@c2b/muven-commons";
import { MuvenAuditFacade, AuditInstance } from "@c2b/muven-audit-core";
import { ObjectUtils } from "@c2b/commons";
import { Order, OrderDao, auditHandlerWithTransaction, auditHandler, ChannelHookEvent } from "@c2b/muven-core";

export class OrderService extends OrderBaseService<OrderCompleteDto, OrderAdapter> {
    constructor(protected requestOptions: MuvenRequestOptions, private facade: Sdk__NAME__Facade) {
        super(OrderAdapter, requestOptions);
    }
}