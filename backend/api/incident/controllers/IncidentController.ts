import * as _ from "underscore";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import * as express from "express";

import IIncidentService from "../services/IIncidentService";
import types from "../services/types";
import IncidentDto from "../services/dto/IncidentDto";

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
    console.log("request ", req.baseUrl);
    return this._incidentService.getIncidentList();
  }

  @httpGet("/:id")
  public getIncident(req: express.Request) {
    let params: any = req.params || {};
    let id = params.id;
    return this._incidentService.getIncident(id);
  }

  @httpPost("/")
  public createIncident(req: express.Request) {
    let incident: IncidentDto = req.body;
    return this._incidentService.upsertIndicent(incident);
  }
}
