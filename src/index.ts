import { AgentOperationEnum } from "@c2b/agent-commons";
import { EntityEnum, MuvenRequestOptions } from "@c2b/muven-commons";
import { LockControl } from "@c2b/muven-core";
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { __NAME__ServicesFacade } from "./services_facade";

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT_API = "/rest-api";

app.use(bodyParser.json());

app.use(async (req, res, next) => {
    req.requestDbOptions = new MuvenRequestOptions({
        idChannel: req.body.idChannel,
        subscriberPublicKey: req.body.subscriberPublicKey
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
        throw new Error("Can't find package.json.")
    }

    const json = {
        "name": pjson.name,
        "version": pjson.version,
        "description": pjson.description,
        "author": pjson.author,
    }

    res.status(200).json(json);
});


app.listen(PORT, async () => {
    console.log(`[__MUVEN-AGENT-NAME__] <===> http://localhost:${PORT}`);
});

function getGenericApiErrorResponse(errorDetails: any): ApiResponseBody {
    return {
        message: `There was a problem processing your request.`,
        details: errorDetails
    };
}

interface ApiResponseBody {
    message: string,
    details?: string,
}
