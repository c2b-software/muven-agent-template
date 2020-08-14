import { Sdk__NAME__Facade } from "@c2b/__SDK-NAME__";
import { __NAME__Helper } from "./utils/helper";
import { MuvenRequestOptions, ChannelEnum } from "@c2b/muven-commons";
import { OrderService } from "./order/service/order_service";
import { ProductService } from "./catalog/service/product_service";
import { BrandService } from "./catalog/service/brand_service";
import { CategoryService } from "./catalog/service/category_service";
import { ChannelDao } from "@c2b/muven-core";
import { HookEventService } from "./hook_event/service/hook_event_service";

export class __NAME__ServicesFacade {

    static async processHookEvents(dbOptions: MuvenRequestOptions) {
        const requestOptionsList = await this.getRequestOptionsList(dbOptions.subscriberPublicKey);
        
        for (const requestOptions of requestOptionsList) {
            const hookEventService = await this.getHookEventService(requestOptions);
    
            await hookEventService.processHookEvents();
        }
    }
    
    static async syncOrders(dbOptions: MuvenRequestOptions) {
        const requestOptionsList = await this.getRequestOptionsList(dbOptions.subscriberPublicKey);
        
        for (const requestOptions of requestOptionsList) {
            const orderService = await this.getOrderService(requestOptions);
    
            await orderService.syncOrders();
        }
    }

    static async syncOrdersUpdate(dbOptions: MuvenRequestOptions) {
        const requestOptionsList = await this.getRequestOptionsList(dbOptions.subscriberPublicKey);
        
        for (const requestOptions of requestOptionsList) {
            const orderService = await this.getOrderService(requestOptions);
    
            await orderService.syncOrderUpdate();
        }
    }

    static async syncSpecificOrders(externalIds: string[], dbOptions: MuvenRequestOptions) {
        const requestOptionsList = await this.getRequestOptionsList(dbOptions.subscriberPublicKey);
        
        for (const requestOptions of requestOptionsList) {
            const orderService = await this.getOrderService(requestOptions);
    
            await orderService.syncSpecificOrdersByExternalId(externalIds);
        }
    }

    static async syncCatalog(dbOptions: MuvenRequestOptions) {
        const requestOptionsList = await this.getRequestOptionsList(dbOptions.subscriberPublicKey);
        
        for (const requestOptions of requestOptionsList) {
            const brandService = await this.getBrandService(requestOptions);
            const productService = await this.getProductService(requestOptions);
            const categoryService = await this.getCategoryService(requestOptions);
    
            await brandService.sync();
            await categoryService.sync();
            await productService.sync();
            await productService.syncStockInfo();
        }
    }

    static async syncProducts(dbOptions: MuvenRequestOptions) {
        const requestOptionsList = await this.getRequestOptionsList(dbOptions.subscriberPublicKey);
        
        for (const requestOptions of requestOptionsList) {
            const productService = await this.getProductService(dbOptions);
    
            await productService.sync();
        }
    }

    static async syncProductsImages(dbOptions: MuvenRequestOptions) {
        const requestOptionsList = await this.getRequestOptionsList(dbOptions.subscriberPublicKey);
        
        for (const requestOptions of requestOptionsList) {
            const productService = await this.getProductService(requestOptions);
    
            await productService.syncImageInfo();

        }
    }

    static async syncProductsStock(dbOptions: MuvenRequestOptions) {
        const requestOptionsList = await this.getRequestOptionsList(dbOptions.subscriberPublicKey);
        
        for (const requestOptions of requestOptionsList) {
            const productService = await this.getProductService(requestOptions);
    
            await productService.syncStockInfo();
        }
    }

    static async syncCategories(dbOptions: MuvenRequestOptions) {
        const requestOptionsList = await this.getRequestOptionsList(dbOptions.subscriberPublicKey);
        
        for (const requestOptions of requestOptionsList) {
            const categoryService = await this.getCategoryService(requestOptions);
    
            await categoryService.sync();
        }
    }

    static async syncBrands(dbOptions: MuvenRequestOptions) {
        const requestOptionsList = await this.getRequestOptionsList(dbOptions.subscriberPublicKey);
        
        for (const requestOptions of requestOptionsList) {
            const brandService = await this.getBrandService(requestOptions);
    
            await brandService.sync();
        }
    }

    private static async getRequestOptionsList(subscriberPublicKey: string): Promise<MuvenRequestOptions[]> {
        const channelList = await new ChannelDao({subscriberPublicKey}).getByType(ChannelEnum.__NAME__);

        const requestOptionsList: MuvenRequestOptions[] = [];
        for (const channel of channelList) {
            requestOptionsList.push(new MuvenRequestOptions({
                idChannel: channel.id,
                subscriberPublicKey,
            }));
        }

        return requestOptionsList;
    }

    private static async get__NAME__Facade(dbOptions: MuvenRequestOptions): Promise<Sdk__NAME__Facade> {
        return await __NAME__Helper.initialize__NAME__Facade(dbOptions);
    }

    private static async getHookEventService(dbOptions: MuvenRequestOptions) : Promise<HookEventService> {
        const orderService = await this.getOrderService(dbOptions);
        const productService = await this.getProductService(dbOptions);
        const categoryService = await this.getCategoryService(dbOptions);
        const brandService = await this.getBrandService(dbOptions);

        return new HookEventService(dbOptions, brandService, categoryService, productService, orderService);
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
