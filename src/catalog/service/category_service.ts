import { ProductBaseService } from "@c2b/agent-commons";
import { MuvenRequestOptions } from "@c2b/muven-commons";
import { Category, CategoryDao } from "@c2b/muven-core";
import { CategoryDto, Sdk__NAME__Facade } from "@c2b/__SDK-NAME__";
import { CategoryAdapter } from "../adapter/category_adapter";

export class CategoryService extends ProductBaseService<Category, CategoryAdapter, CategoryDto, CategoryDao> {
    constructor(protected requestOptions: MuvenRequestOptions, private facade: Sdk__NAME__Facade) {
        super(CategoryDao, CategoryAdapter, requestOptions);
    }

    protected async createInChannel(dto: CategoryDto): Promise<string> {
        // ???
    }

    protected async updateInChannel(dto:CategoryDto): Promise<void> {
        // ???
    }
}
