import { ProductBaseService } from "@c2b/agent-commons";
import { MuvenRequestOptions } from "@c2b/muven-commons";
import { Product, ProductDao, ProductStore, IPendingByChannelOptions } from "@c2b/muven-core";
import { Sdk__NAME__Facade, ProductDto } from "@c2b/__SDK-NAME__";
import { ProductAdapter } from "../adapter/product_adapter";

export class ProductService extends ProductBaseService<Product, ProductAdapter, ProductDto, ProductDao> {
    constructor(protected requestOptions: MuvenRequestOptions, private facade: Sdk__NAME__Facade) {
        super(ProductDao, ProductAdapter, requestOptions);
    }

    protected async createInChannel(dto: ProductDto): Promise<string> {
        // ???
    }

    protected async updateInChannel(dto: ProductDto): Promise<void> {
        // ???
    }

    protected async updateStockInfo(productStore: ProductStore): Promise<void> {
        // ???
    }

    protected async getPendingEntities(options?: IPendingByChannelOptions): Promise<Product[]> {
        // ???
    }
}
