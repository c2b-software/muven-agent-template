import { Request, Response, Router } from "express";
import { httpDefaultHandle } from "@c2b/web-commons";
import { AuthService } from "../service/auth_service";
import { __NAME__Dto } from "@c2b/muven-commons";

export class AuthEndpoint {
    private BASE_PATH: string = "/auth";

    constructor(private ttl?: number) {

    }

    add(): Router {

        const router: Router = Router();

        router.post(`${this.BASE_PATH}/test`, async (req: Request, res: Response) => {

            await httpDefaultHandle(async () => {
                return await new AuthService(new __NAME__Dto(req.body)).testConnection();
            }, res);

        });

        return router;
    }
}