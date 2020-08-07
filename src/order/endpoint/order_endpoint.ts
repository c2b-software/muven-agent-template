import { EntityEnum, ChannelEnum } from "@c2b/muven-commons";
import { LockControl } from "@c2b/muven-core";
import { httpDefaultHandle } from "@c2b/web-commons";
import { Request, Response, Router } from "express";
import { __NAME__Helper } from "../../utils/helper";
import { OrderService } from "../service/order_service";
import { __NAME__ServicesFacade } from "../../service_facade";

export class OrderEndpoint {

    private BASE_PATH: string = '/orders';
    
    constructor(private ttl?: number) {

    }

    add(): Router {
        const router:Router = Router();

        router.post(`${this.BASE_PATH}/sync`, async (req: Request, res: Response) => {
            try {
                await LockControl.getInstance(this.ttl).lock(ChannelEnum[ChannelEnum.__NAME__], req.requestDbOptions.subscriberPublicKey, EntityEnum.Order, async () => {
                    httpDefaultHandle(async() => {
                        return await __NAME__ServicesFacade.syncOrders(req.requestDbOptions);
                    }, res);
                });
            } catch(error) {
                res.status(409).send(error);
                throw error;
            }
        });

        router.post(`${this.BASE_PATH}/sync_status_update`, async (req: Request, res: Response) => {
            try {
                await LockControl.getInstance(this.ttl).lock(ChannelEnum[ChannelEnum.__NAME__], req.requestDbOptions.subscriberPublicKey, EntityEnum.Order, async () => {
                    httpDefaultHandle(async() => {
                        return await __NAME__ServicesFacade.syncOrdersUpdate(req.requestDbOptions);
                    }, res);
                });
            } catch (error) {
                res.status(409).send(error);
                throw error;
            }
        });
        
        router.post(`${this.BASE_PATH}/sync_specific`, async (req: Request, res: Response) => {
            try {
                await LockControl.getInstance(this.ttl).lock(ChannelEnum[ChannelEnum.__NAME__], req.requestDbOptions.subscriberPublicKey, EntityEnum.Order, async () => {
                    httpDefaultHandle(async() => {
                        return await __NAME__ServicesFacade.syncSpecificOrders(req.body.orders, req.requestDbOptions);
                    }, res);
                });
            } catch (error) {
                res.status(409).send(error);
                throw error;
            }
        });

        return router;
    }
}