import { Sdk__NAME__Facade } from "@c2b/__SDK-NAME__";
import { __NAME__Helper } from "./utils/helper";
import { MuvenRequestOptions } from "@c2b/muven-commons";
import { OrderService } from "./order/service/order_service";
import { ProductService } from "./catalog/service/product_service";
import { BrandService } from "./catalog/service/brand_service";
import { CategoryService } from "./catalog/service/category_service";

export class __NAME__ServicesFacade {

    static async processHookEvents(dbOptions: MuvenRequestOptions) {
        const hookEventService = await this.getHookEventService(dbOptions);

        await hookEventService.processHookEvents();
    }
    
    static async syncOrdersUpdate(dbOptions: MuvenRequestOptions) {
        const orderService = await this.getOrderService(dbOptions);

        await orderService.syncOrderUpdate();
    }

    static async syncSpecificOrders(externalIds: string[], dbOptions: MuvenRequestOptions) {
        const orderService = await this.getOrderService(dbOptions);

        await orderService.syncSpecificOrdersByExternalId(externalIds);
    }

    static async syncCatalog(dbOptions: MuvenRequestOptions) {
        const productService = await this.getProductService(dbOptions);
        const categoryService = await this.getCategoryService(dbOptions);

        await categoryService.sync();
        await productService.sync(productService.getProductSyncOptions());
    }

    static async syncProducts(dbOptions: MuvenRequestOptions) {
        const productService = await this.getProductService(dbOptions);

        await productService.sync(productService.getProductSyncOptions());
    }

    static async syncProductsImages(dbOptions: MuvenRequestOptions) {
        const productService = await this.getProductService(dbOptions);

        await productService.syncImageInfo();
    }

    static async syncProductsStock(dbOptions: MuvenRequestOptions) {
        const productService = await this.getProductService(dbOptions);

        await productService.syncStockInfo();
    }

    static async syncCategories(dbOptions: MuvenRequestOptions) {
        const categoryService = await this.getCategoryService(dbOptions);

        await categoryService.sync();
    }

    static async syncBrands(dbOptions: MuvenRequestOptions) {
        const brandService = await this.getBrandService(dbOptions);

        await brandService.sync();
    }

    private static async get__NAME__Facade(dbOptions: MuvenRequestOptions): Promise<Sdk__NAME__Facade> {
        return await __NAME__Helper.initialize__NAME__Facade(dbOptions);
    }

    private static async getHookEventService(dbOptions: MuvenRequestOptions) : Promise<HookEventService> {
        const orderService = await this.getOrderService(dbOptions);
        const productService = await this.getProductService(dbOptions);
        const categoryService = await this.getCategoryService(dbOptions);
        // const brandService = await this.getBrandService(dbOptions);

        return new HookEventService(dbOptions, undefined, categoryService, productService, orderService);
    }

    private static async getOrderService(dbOptions: MuvenRequestOptions): Promise<OrderService> {
        const facade = await this.get__NAME__Facade(dbOptions);
        return new OrderService(dbOptions, facade);
    }

    private static async getProductService(dbOptions: MuvenRequestOptions): Promise<ProductService> {
        const facade = await this.get__NAME__Facade(dbOptions);
        return new ProductService(dbOptions, facade);
    }

    private static async getBrandService(dbOptions: MuvenRequestOptions): Promise<BrandService> {
        const facade = await this.get__NAME__Facade(dbOptions);
        return new BrandService(dbOptions, facade);
    }

    private static async getCategoryService(dbOptions: MuvenRequestOptions): Promise<CategoryService> {
        const facade = await this.get__NAME__Facade(dbOptions);
        return new CategoryService(dbOptions, facade);
    }
}
