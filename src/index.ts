import { ChannelEnum, MuvenRequestOptions } from "@c2b/muven-commons";
import bodyParser from 'body-parser';
import express, { Request, Response, Router } from 'express';
import { AuthEndpoint } from "./auth/endpoint/auth_endpoint";
import { CatalogEndpoint } from "./catalog/endpoint/catalog_endpoint";
import { ProductEndpoint } from "./catalog/endpoint/product_endpoint";
import { HookEventEndpoint } from "./hook_event/endpoint/hook_event_endpoint";
import { OrderEndpoint } from "./order/endpoint/order_endpoint";
import { __NAME__Worker } from "./worker/worker";

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT_API = "/agent-rest-api";
const DEFAULT_TTL = 1 * 60 * 1000;
const CATALOG_TTL = 3 * 60 * 1000;

app.use(bodyParser.json());

app.use(async (req, res, next) => {
    req.requestDbOptions = new MuvenRequestOptions({
        idChannel: req.body.idChannel || req.headers["id-channel"],
        subscriberPublicKey: req.body.subscriberPublicKey || req.headers["muven-client-id"],
    });

    next();
});

app.get(`/`, async (req: Request, res: Response) => {
    let pjson;
    try {
        pjson = require('./package.json');
    } catch (error) {
        pjson = require('../package.json');
    }

    if (!pjson) {
        throw new Error("Can't find package.json.");
    }

    const json = {
        "name": pjson.name,
        "version": pjson.version,
        "description": pjson.description,
        "author": pjson.author,
    };

    res.status(200).json(json);
});


app.listen(PORT, async () => {
    console.log(`[__MUVEN-AGENT-NAME__] <===> http://localhost:${PORT}`);
});

__NAME__Worker.initialize(ChannelEnum.__NAME__, __NAME__Worker);

const router:Router = Router();
app.use(`${ROOT_API}/`, router);
router.use('/', new AuthEndpoint(CATALOG_TTL).add());
router.use('/', new CatalogEndpoint(CATALOG_TTL).add());
router.use('/', new ProductEndpoint(DEFAULT_TTL).add());
router.use('/', new OrderEndpoint(DEFAULT_TTL).add());
router.use('/', new HookEventEndpoint(DEFAULT_TTL).add());
