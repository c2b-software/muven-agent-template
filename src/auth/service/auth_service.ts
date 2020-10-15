import { __NAME__Dto } from "@c2b/muven-commons";
import { Sdk__NAME__Facade } from "@c2b/__SDK-NAME__";

export class AuthService {
    constructor(protected dto: __NAME__Dto, private facade?: Sdk__NAME__Facade) {
        
    }

    public async testConnection(): Promise<void> {
        try {
            const result = await (await this.getFacade()).auth.authenticate();
        } catch (error) {
            throw error;
        }
    }

    public async getFacade(): Promise<Sdk__NAME__Facade> {
        if (!this.facade) {
            this.facade = await new Sdk__NAME__Facade(this.dto);
        }
        return this.facade;
    }
}