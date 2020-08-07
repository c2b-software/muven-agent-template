import { EntityEnum, ChannelEnum } from "@c2b/muven-commons";
import { LockControl } from "@c2b/muven-core";
import { httpDefaultHandle } from "@c2b/web-commons";
import { Request, Response, Router } from "express";
import { __NAME__Helper } from "../../utils/helper";
import { ProductService } from "../service/product_service";
import { __NAME__ServicesFacade } from "../../service_facade";

export class ProductEndpoint {
    private BASE_PATH: string = `/products`;

    constructor(private ttl?: number) {

    }

    add(): Router {
        const router: Router = Router();

        router.post(`${this.BASE_PATH}/sync`, async (req: Request, res: Response) => {
            try {
                await LockControl.getInstance(this.ttl).lock(ChannelEnum[ChannelEnum.__NAME__], req.requestDbOptions.subscriberPublicKey, EntityEnum.Product, async () => {
                    httpDefaultHandle(async () => {
                        return await __NAME__ServicesFacade.syncProducts(req.requestDbOptions);
                    }, res);
                });
            } catch (error) {
                res.status(409).send(error);
                throw error;
            }
        });
        
        router.post(`${this.BASE_PATH}/sync_images`, async (req: Request, res: Response) => {
            try {
                await LockControl.getInstance(this.ttl).lock(ChannelEnum[ChannelEnum.__NAME__], req.requestDbOptions.subscriberPublicKey, EntityEnum.Product, async () => {
                    httpDefaultHandle(async () => {
                        return await __NAME__ServicesFacade.syncProductsImages(req.requestDbOptions);
                    }, res);
                });
            } catch (error) {
                res.status(409).send(error);
                throw error;
            }
        });
        
        router.post(`${this.BASE_PATH}/sync_stock`, async (req: Request, res: Response) => {
            try {
                await LockControl.getInstance(this.ttl).lock(ChannelEnum[ChannelEnum.__NAME__], req.requestDbOptions.subscriberPublicKey, EntityEnum.Product, async () => {
                    httpDefaultHandle(async () => {
                        return await __NAME__ServicesFacade.syncProductsStock(req.requestDbOptions);
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