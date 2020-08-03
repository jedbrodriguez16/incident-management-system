import * as _ from "underscore";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";
import * as express from "express";

import IIncidentService from "../services/IIncidentService";
import types from "../services/types";

@controller("/incidents")
export class IncidentController {
  @inject(types.IIncidentService)
  private readonly _incidentService: IIncidentService;

  @httpGet("/ping")
  public ping() {
    return "pong!";
  }

  @httpGet("/")
  public getIncidents(req: express.Request) {
    console.log("request ", req.app);
    return this._incidentService.getIncidentList();
  }
}
