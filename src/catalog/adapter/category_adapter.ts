import { CategoryDto } from '@c2b/__SDK-NAME__';
import { Category } from '@c2b/muven-core'
import { ObjectUtils } from '@c2b/commons';
import { BaseAdapter } from '@c2b/agent-commons';

export class CategoryAdapter extends BaseAdapter<CategoryDto, Category> {
    isNew(dto: CategoryDto): boolean {
        return !!dto.Category.id;
    }

    async convertToMuven(dto: CategoryDto):Promise<Category> {
        const entity = new Category();

        // ???

        return entity;
    }

    async convertFromMuven(entity: Category):Promise<CategoryDto> {
        const dto = new CategoryDto({
            // ???
        });

        return ObjectUtils.normalizeNull(dto);
    }
}
