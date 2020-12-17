import { BaseWorker } from "@c2b/agent-commons";
import { EntityEnum, MuvenRequestOptions, __NAME__Dto } from "@c2b/muven-commons";
import { ChannelDao } from "@c2b/muven-core";
import is from "is_js";
import { __NAME__ServicesFacade } from "../service_facade";

export class __NAME__Worker extends BaseWorker {

    protected async processEvent(entity: EntityEnum, dbOptions: MuvenRequestOptions) {

        console.log(`NuvemShopWorker --> entity: ${entity} --> dbOptions: ${JSON.stringify(dbOptions)}`);
        switch (entity) {
            case EntityEnum.HookEvent:
                await __NAME__ServicesFacade.processHookEvents(dbOptions);
                break;
            case EntityEnum.Order:
                await __NAME__ServicesFacade.syncOrdersUpdate(dbOptions);
                break;
            case EntityEnum.Category:
            case EntityEnum.Product:
            case EntityEnum.ProductStore:
            case EntityEnum.ProductCategory:
            case EntityEnum.Brand:
            case EntityEnum.ProductImage:
            case EntityEnum.Attribute:
            case EntityEnum.AttributeValue:
                await __NAME__ServicesFacade.syncCatalog(dbOptions);
                break;
            case EntityEnum.AsyncSynchronization:
                await __NAME__ServicesFacade.processHookEvents(dbOptions);
                await __NAME__ServicesFacade.syncOrdersUpdate(dbOptions);
                await __NAME__ServicesFacade.syncCatalog(dbOptions);
                break;
        }
    }

    protected async checkCredential(dbOptions: MuvenRequestOptions): Promise<boolean> {

        const dao = new ChannelDao(dbOptions);
        const credentials = await dao.getCredentials<__NAME__Dto>(dbOptions.idChannel) as __NAME__Dto;
        const ret = is.existy(credentials) && this.isNotEmpty(credentials.code) && this.isNotEmpty(credentials.accessToken) && is.existy(credentials.storeId);
        return ret;

    }

    private isNotEmpty(value: string): boolean {
        return is.existy(value) && is.not.empty(value);
    }

}   