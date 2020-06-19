import { ProductBaseService, CategoryBaseService } from "@c2b/agent-commons";
import { MuvenRequestOptions } from "@c2b/muven-commons";
import { Category, CategoryDao } from "@c2b/muven-core";
import { CategoryDto, Sdk__NAME__Facade } from "@c2b/__SDK-NAME__";
import { CategoryAdapter } from "../adapter/category_adapter";
import { __NAME__Helper } from "../../utils/__NAME__Helper";

export class CategoryService extends CategoryBaseService<CategoryDto, CategoryAdapter> {
    constructor(protected requestOptions: MuvenRequestOptions, private facade: Sdk__NAME__Facade) {
        super(CategoryAdapter, requestOptions);
    }

    protected async isNew(dto: CategoryDto, entityId?: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    protected async createInChannel(dto: CategoryDto): Promise<string> {
        throw new Error("Method not implemented.");
    }

    protected async updateInChannel(dto: CategoryDto): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async getFacade(): Promise<Sdk__NAME__Facade> {
        if (!this.facade) {
            this.facade = await __NAME__Helper.initialize__NAME__Facade(this.requestOptions);
        }
        return this.facade;
    }
}
