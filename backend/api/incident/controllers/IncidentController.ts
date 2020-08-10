import * as _ from "underscore";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  httpDelete,
} from "inversify-express-utils";
import * as express from "express";

import IIncidentService from "../services/IIncidentService";
import types from "../services/types";
import IncidentDto from "../services/dto/IncidentDto";
import {
  CreateIncidentRequest,
  AssignIncidentRequest,
  AcknowledgeIncidentRequest,
  ResolveIncidentRequest,
} from "./IncidentRequest";
import { IncidentStatusEnum } from "./IncidentStatusEnum";
import * as moment from "moment";
import { authorisation } from "../../../common/interceptors/authorisationFactory";
import iocContainer from "../iocContainer";
import userInfo from "../../../common/interceptors/userInfoInterceptorFactory";

@controller("/api/incidents")
export class IncidentController {
  @inject(types.IIncidentService)
  private readonly _incidentService: IIncidentService;

  @httpGet("/")
  public getIncidents() {
    return this._incidentService.getIncidentList();
  }

  @httpGet("/:id", authorisation(iocContainer, "incident", "get-one"))
  public getIncident(req: express.Request) {
    let params: any = req.params || {};
    let id = params.id;
    return this._incidentService.getIncident(id);
  }

  @httpPost(
    "/",
    authorisation(iocContainer, "incident", "create"),
    userInfo(iocContainer)
  )
  public createIncident(req: express.Request) {
    let request: any = req;
    let input: CreateIncidentRequest = request.body;

    let incident = new IncidentDto();
    incident.title = input.title;
    incident.description = input.description;

    let now = moment(new Date()).toISOString();

    let username = request.userInfo.username;
    incident.status = IncidentStatusEnum.New;
    incident.assignedTo = username;
    incident.createdBy = username;
    incident.createdDate = now;
    incident.updatedBy = username;
    incident.updatedDate = now;

    return this._incidentService.upsertIndicent(incident);
  }

  @httpPost(
    "/assign",
    authorisation(iocContainer, "incident", "assign"),
    userInfo(iocContainer)
  )
  public async assignIncident(req: express.Request) {
    let request: any = req;
    let input: AssignIncidentRequest = request.body;

    let incident = await this._incidentService.getIncident(input.incidentId);
    incident.assignedTo = input.username;

    let username = request.userInfo.username;

    incident.status = IncidentStatusEnum.Assigned;
    incident.updatedBy = username;
    incident.updatedDate = moment(new Date()).toISOString();

    return this._incidentService.upsertIndicent(incident);
  }

  @httpPost(
    "/acknowledge",
    authorisation(iocContainer, "incident", "acknowledge"),
    userInfo(iocContainer)
  )
  public async acknowledgeIncident(req: express.Request) {
    let request: any = req;
    let input: AcknowledgeIncidentRequest = request.body;

    let incident = await this._incidentService.getIncident(input.incidentId);

    let username = request.userInfo.username;

    incident.status = IncidentStatusEnum.Acknowledged;
    incident.updatedBy = username;
    incident.updatedDate = moment(new Date()).toISOString();

    return this._incidentService.upsertIndicent(incident);
  }

  @httpPost(
    "/resolve",
    authorisation(iocContainer, "incident", "resolve"),
    userInfo(iocContainer)
  )
  public async resolveIncident(req: express.Request) {
    let request: any = req;
    let input: ResolveIncidentRequest = request.body;

    let incident = await this._incidentService.getIncident(input.incidentId);

    let username = request.userInfo.username;

    incident.status = IncidentStatusEnum.Resolved;
    incident.updatedBy = username;
    incident.updatedDate = moment(new Date()).toISOString();
    incident.resolutionComment = input.resolutionComment;

    return this._incidentService.upsertIndicent(incident);
  }

  @httpDelete(
    "/:id",
    authorisation(iocContainer, "incident", "delete"),
    userInfo(iocContainer)
  )
  public deleteIncident(req: express.Request) {
    let params: any = req.params || {};
    let id = params.id;
    return this._incidentService.deleteIncident(id);
  }
}
