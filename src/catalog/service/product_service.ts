import { ProductBaseService } from "@c2b/agent-commons";
import { MuvenRequestOptions, AttributeTypeEnum } from "@c2b/muven-commons";
import { Product, ProductDao, ProductStore, IPendingByChannelOptions, ProductCategoryChannel } from "@c2b/muven-core";
import { Sdk__NAME__Facade, ProductDto, VariationDto } from "@c2b/__SDK-NAME__";
import { ProductAdapter } from "../adapter/product_adapter";
import { VariationAdapter } from "../adapter/variation_adapter";
import { ISyncProductOptions } from "@c2b/agent-commons/dist/service/product_base_service";
import { EntityManager } from "typeorm";

export class ProductService extends ProductBaseService<ProductDto, VariationDto, ProductAdapter, VariationAdapter> {
    constructor(protected requestOptions: MuvenRequestOptions, private facade: Sdk__NAME__Facade) {
        super(ProductAdapter, VariationAdapter, requestOptions);
    }

    getProductSyncOptions(): ISyncProductOptions {
        return {
            syncPendingBrand: false,
            syncPendingCategories: true,
        };
    }

    protected async isNewProduct(dto: ProductDto, entityId?: number, manager?: EntityManager): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    protected async isNewVariation(dto: VariationDto, entityId?: number, manager?: EntityManager): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    protected async createProductInChannel(dto: ProductDto): Promise<string> {
        throw new Error("Method not implemented.");
    }

    protected async createVariationInChannel(dto: VariationDto): Promise<string> {
        throw new Error("Method not implemented.");
    }

    protected async updateProductInChannel(dto: ProductDto): Promise<void> {
        throw new Error("Method not implemented.");
    }

    protected async updateVariationInChannel(dto: VariationDto): Promise<void> {
        throw new Error("Method not implemented.");
    }

    protected async updateStockInfo(productStore: ProductStore, params?: any, manager?: EntityManager): Promise<void> {
        const product = await this.getEntityById(productStore.idProduct, undefined, manager);

        if (product && product.stores?.[0]?.channels?.[0]?.idExternalChannel) {
            if (product.attributes?.find((a) => a.attribute.type === AttributeTypeEnum.Grid)) {
                const variationDto = await new VariationAdapter().convertStockOnly(product);
                await this.updateVariationInChannel(variationDto);
            } else {
                const productDto = await new ProductAdapter().convertStockOnly(product);
                await this.updateProductInChannel(productDto);
            }
        }
    }

    protected async updatePriceInfo(productStore: ProductStore, params?: any, manager?: EntityManager): Promise<void> {
        const product = await this.getEntityById(productStore.idProduct, { attributes: true, store: true }, manager);

        if (product && product.stores?.[0]?.channels?.[0]?.idExternalChannel) {
            if (product.attributes?.find((a) => a.attribute.type === AttributeTypeEnum.Grid)) {
                const variationDto = await new VariationAdapter().convertPriceOnly(product);
                await this.updateVariationInChannel(variationDto);
            } else {
                const productDto = await new ProductAdapter().convertPriceOnly(product);
                await this.updateProductInChannel(productDto);
            }
        }
    }

    protected async getPendingEntities(options?: IPendingByChannelOptions): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
}
