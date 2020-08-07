import { Router, Request, Response } from "express";
import { LockControl } from "@c2b/muven-core";
import { EntityEnum, ChannelEnum } from "@c2b/muven-commons";
import { httpDefaultHandle } from "@c2b/web-commons";
import { __NAME__ServicesFacade } from "../../service_facade";
import { __NAME__Helper } from "../../utils/helper";

export class HookEventEndpoint {

    private BASE_PATH:string = `hook_events/`;

    constructor(private ttl?: number) {

    }

    add(): Router {

        const router: Router = Router();

        router.post(`${this.BASE_PATH}/process`, async (req: Request, res: Response) => {
            try {
                await LockControl.getInstance(this.ttl).lock(ChannelEnum[ChannelEnum.__NAME__], req.requestDbOptions.subscriberPublicKey, EntityEnum.Order, async () => {
                    httpDefaultHandle(async () => {
                        return await __NAME__ServicesFacade.processHookEvents(req.requestDbOptions);
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