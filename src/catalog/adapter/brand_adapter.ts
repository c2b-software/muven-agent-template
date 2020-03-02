import { BrandDto } from '@c2b/__SDK-NAME__';
import { Brand } from '@c2b/muven-core';
import { ObjectUtils } from '@c2b/commons';
import { BaseAdapter } from '@c2b/agent-commons';

export class BrandAdapter extends BaseAdapter<BrandDto, Brand> {
    async convertToMuven(dto: BrandDto):Promise<Brand> {
        const entity = new Brand();

        // ???

        return entity;
    }

    async convertFromMuven(entity: Brand):Promise<BrandDto> {
        const dto = new BrandDto({
            // ???
        });

        return ObjectUtils.normalizeNull(dto);
    }

    isNew(dto: BrandDto): boolean {
        // ???
    }
}
