import { MuvenRequestOptions, __NAME__Dto } from "@c2b/muven-commons";
import { ChannelService } from "@c2b/agent-commons";
import { Sdk__NAME__Facade } from "@c2b/__SDK-NAME__";

export class __NAME__Helper {
    public static async initialize__NAME__Facade(dbOptions: MuvenRequestOptions): Promise<Sdk__NAME__Facade> {
        const __NAME__Dto = await new ChannelService<__NAME__Dto>().getConnectionInfo(dbOptions) as __NAME__Dto;
    
        return new Sdk__NAME__Facade(__NAME__Dto);
    }
}
