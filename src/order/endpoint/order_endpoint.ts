import { EntityEnum, ChannelEnum } from "@c2b/muven-commons";
import { LockControl } from "@c2b/muven-core";
import { httpDefaultHandle } from "@c2b/web-commons";
import { Request, Response, Router } from "express";
import { __NAME__Helper } from "../../utils/helper";
import { OrderService } from "../service/order_service";

export class OrderEndpoint {

    private BASE_PATH: string = '/orders';
    
    constructor(private ttl?: number) {

    }

    add(): Router {
        const router:Router = Router();

        router.post(`${this.BASE_PATH}/sync`, async (req: Request, res: Response) => {
            await LockControl.getInstance(this.ttl).lock(ChannelEnum[ChannelEnum.__NAME__], req.requestDbOptions.subscriberPublicKey, EntityEnum.Order, async () => {
                httpDefaultHandle(async() => {
                    const facade = await __NAME__Helper.initialize__NAME__Facade(req.requestDbOptions);
                    return await new OrderService(req.requestDbOptions, facade).syncOrders();
                }, res);
            });
        });

        router.post(`${this.BASE_PATH}/sync_status_update`, async (req: Request, res: Response) => {
            await LockControl.getInstance(this.ttl).lock(ChannelEnum[ChannelEnum.__NAME__], req.requestDbOptions.subscriberPublicKey, EntityEnum.Order, async () => {
                httpDefaultHandle(async() => {
                    const facade = await __NAME__Helper.initialize__NAME__Facade(req.requestDbOptions);
                    return await new OrderService(req.requestDbOptions, facade).syncOrderUpdate();
                }, res);
            });
        });
        
        router.post(`${this.BASE_PATH}/sync_specific`, async (req: Request, res: Response) => {
            await LockControl.getInstance(this.ttl).lock(ChannelEnum[ChannelEnum.__NAME__], req.requestDbOptions.subscriberPublicKey, EntityEnum.Order, async () => {
                httpDefaultHandle(async() => {
                    const facade = await __NAME__Helper.initialize__NAME__Facade(req.requestDbOptions);
                    return await new OrderService(req.requestDbOptions, facade).syncSpecificOrdersByExternalId(req.body.orders);
                }, res);
            });
        });

        return router;
    }
}