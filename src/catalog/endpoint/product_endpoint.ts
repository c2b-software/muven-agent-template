import { EntityEnum, ChannelEnum } from "@c2b/muven-commons";
import { LockControl } from "@c2b/muven-core";
import { httpDefaultHandle } from "@c2b/web-commons";
import { Request, Response, Router } from "express";
import { __NAME__Helper } from "../../utils/helper";
import { ProductService } from "../service/product_service";

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
                        const facade = await __NAME__Helper.initialize__NAME__Facade(req.requestDbOptions);
                        const service = new ProductService(req.requestDbOptions, facade);
                        return await service.sync(service.getProductSyncOptions());
                    }, res);
                });
            } catch (error) {
                res.status(409).send(error);
                throw error;
            }
        });

        router.post(`${this.BASE_PATH}/sync_categories`, async (req: Request, res: Response) => {
            try {
                await LockControl.getInstance(this.ttl).lock(ChannelEnum[ChannelEnum.__NAME__], req.requestDbOptions.subscriberPublicKey, EntityEnum.Product, async () => {
                    httpDefaultHandle(async () => {
                        const facade = await __NAME__Helper.initialize__NAME__Facade(req.requestDbOptions);
                        return await new ProductService(req.requestDbOptions, facade).syncCategoryInfo();
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
                        const facade = await __NAME__Helper.initialize__NAME__Facade(req.requestDbOptions);
                        return await new ProductService(req.requestDbOptions, facade).syncImageInfo();
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
                        const facade = await __NAME__Helper.initialize__NAME__Facade(req.requestDbOptions);
                        return await new ProductService(req.requestDbOptions, facade).syncStockInfo();
                    }, res);
                });
            } catch (error) {
                res.status(409).send(error);
                throw error;
            }
        });

        router.post(`${this.BASE_PATH}/delete`, async (req: Request, res: Response) => {
            try {
                await LockControl.getInstance(this.ttl).lock(ChannelEnum[ChannelEnum.__NAME__], req.requestDbOptions.subscriberPublicKey, EntityEnum.Product, async () => {
                    httpDefaultHandle(async () => {
                        const facade = await __NAME__Helper.initialize__NAME__Facade(req.requestDbOptions);
                        return await new ProductService(req.requestDbOptions, facade).deleteProduct(req.body.productId);
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