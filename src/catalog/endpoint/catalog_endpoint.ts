import { ChannelEnum, EntityEnum } from "@c2b/muven-commons";
import { LockControl } from "@c2b/muven-core";
import { httpDefaultHandle } from "@c2b/web-commons";
import { Request, Response, Router } from "express";
import { __NAME__Helper } from "../../utils/helper";
import { CategoryService } from "../service/category_service";
import { ProductService } from "../service/product_service";

export class CatalogEndpoint {
    private BASE_PATH: string = `/catalog`;

    constructor(private ttl?: number) {

    }

    add(): Router {
        const router: Router = Router();

        router.post(`${this.BASE_PATH}/sync`, async (req: Request, res: Response) => {
            try {
                await LockControl.getInstance(this.ttl).lock(ChannelEnum[ChannelEnum.__NAME__], req.requestDbOptions.subscriberPublicKey, EntityEnum.Product, async () => {
                    httpDefaultHandle(async () => {
                        const facade = await __NAME__Helper.initializeFacade(req.requestDbOptions);
                        await new CategoryService(req.requestDbOptions, facade).sync();
                        await new ProductService(req.requestDbOptions, facade).sync({syncPendingBrand: false, syncPendingCategories: true});
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