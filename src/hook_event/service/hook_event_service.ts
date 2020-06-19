import { HookEventBaseService } from "@c2b/agent-commons";
import { MuvenRequestOptions } from "@c2b/muven-commons";
import { CategoryService } from "../../catalog/service/category_service";
import { ProductService } from "../../catalog/service/product_service";
import { BrandService } from "../../catalog/service/brand_service";
import { OrderService } from "../../order/service/order_service";
import { ChannelHookEvent } from "@c2b/muven-core";

export class HookEventService extends HookEventBaseService {
    constructor (
        protected requestOptions: MuvenRequestOptions,
        protected brandService: BrandService,
        protected categoryService: CategoryService,
        protected productService: ProductService,
        protected orderService: OrderService
    ) {
        super(requestOptions, orderService, productService, categoryService, brandService);
    }

    protected async processChannelSpecificHookEvents(hookEvent: ChannelHookEvent): Promise<void> {
        throw new Error("Method not implemented");
    }
}