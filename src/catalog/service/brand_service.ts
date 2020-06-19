import { ProductBaseService, BrandBaseService } from "@c2b/agent-commons";
import { Brand, BrandDao } from "@c2b/muven-core";
import { BrandDto, Sdk__NAME__Facade } from "@c2b/__SDK-NAME__";
import { BrandAdapter } from "../adapter/brand_adapter";
import { MuvenRequestOptions } from "@c2b/muven-commons";

export class BrandService extends BrandBaseService<BrandDto, BrandAdapter> {
    constructor(protected requestOptions: MuvenRequestOptions, private facade: Sdk__NAME__Facade) {
        super(BrandAdapter, requestOptions);
    }

    protected async createInChannel(dto: BrandDto): Promise<string> {
        throw new Error("Method not implemented.");
    }

    protected async updateInChannel(dto:BrandDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
