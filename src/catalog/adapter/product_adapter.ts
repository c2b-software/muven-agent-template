import { ProductDto } from '@c2b/__SDK-NAME__';
import { Product } from '@c2b/muven-core'
import { ObjectUtils } from '@c2b/commons';
import { BaseAdapter } from '@c2b/agent-commons';

export class ProductAdapter extends BaseAdapter<ProductDto, Product> {
    validateBeforeSync(entity: Product): void {
        throw new Error("Method not implemented.");
    }

    validateAfterSync(dto: ProductDto): void {
        throw new Error("Method not implemented.");
    }

    isNew(dto: ProductDto): boolean {
        // ???
    }
    
    async convertToMuven(dto: ProductDto): Promise<Product> {
        const entity = new Product();

        // ???

        return entity;
    }

    async convertFromMuven(entity: Product): Promise<ProductDto>  {
        const dto = new ProductDto({
            // ???
        });

        return ObjectUtils.normalizeNull(dto);
    }
}
