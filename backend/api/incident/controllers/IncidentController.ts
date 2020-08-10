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

// import commonTypes from "../../../common/services/types";
// import IHttpService from "../../../common/services/IHttpService";
// import IJwtService from "../../identity/services/IJwtService";
// import identityServicesTypes from "../../identity/services/types";

@controller("/api/incidents")
export class IncidentController {
  @inject(types.IIncidentService)
  private readonly _incidentService: IIncidentService;

  // @inject(identityServicesTypes.IJwtService)
  // private readonly _jwtService: IJwtService;

  // @inject(commonTypes.IHttpService)
  // private readonly _httpService: IHttpService;

  @httpGet("/")
  public getIncidents() {
    return this._incidentService.getIncidentList();
  }

  @httpGet("/:id")
  public getIncident(req: express.Request) {
    let params: any = req.params || {};
    let id = params.id;
    return this._incidentService.getIncident(id);
  }

  @httpPost("/", authorisation(iocContainer, "incident", "create"))
  public createIncident(req: express.Request) {
    let input: CreateIncidentRequest = req.body;

    let incident = new IncidentDto();
    incident.title = input.title;
    incident.description = input.description;

    // const bearerToken = this._httpService.getBearerToken(req);
    // let decryptedValue = this._jwtService.decrypt(bearerToken);
    // console.log("------- decrypted value ----- ", decryptedValue);
    let username = "Jed"; //todo: get from token, check admin role
    let now = moment(new Date()).toISOString();

    incident.status = IncidentStatusEnum.New;
    incident.assignedTo = null;
    incident.createdBy = username;
    incident.createdDate = now;
    incident.updatedBy = username;
    incident.updatedDate = now;

    return this._incidentService.upsertIndicent(incident);
  }

  @httpPost("/assign")
  public async assignIncident(req: express.Request) {
    let input: AssignIncidentRequest = req.body;

    let incident = await this._incidentService.getIncident(input.incidentId);
    incident.assignedTo = input.username;

    let username = "Jed"; //todo: get from token, check admin role

    incident.status = IncidentStatusEnum.Assigned;
    incident.updatedBy = username;
    incident.updatedDate = moment(new Date()).toISOString();

    return this._incidentService.upsertIndicent(incident);
  }

  @httpPost("/acknowledge")
  public async acknowledgeIncident(req: express.Request) {
    let input: AcknowledgeIncidentRequest = req.body;

    let incident = await this._incidentService.getIncident(input.incidentId);

    let username = "User1"; //todo: get from token, check user role

    incident.status = IncidentStatusEnum.Acknowledged;
    incident.updatedBy = username;
    incident.updatedDate = moment(new Date()).toISOString();

    return this._incidentService.upsertIndicent(incident);
  }

  @httpPost("/resolve")
  public async resolveIncident(req: express.Request) {
    let input: ResolveIncidentRequest = req.body;

    let incident = await this._incidentService.getIncident(input.incidentId);

    let username = "User1"; //todo: get from token, check user role

    incident.status = IncidentStatusEnum.Resolved;
    incident.updatedBy = username;
    incident.updatedDate = moment(new Date()).toISOString();
    incident.resolutionComment = input.resolutionComment;

    return this._incidentService.upsertIndicent(incident);
  }

  @httpDelete("/:id")
  public deleteIncident(req: express.Request) {
    let params: any = req.params || {};
    let id = params.id;
    return this._incidentService.deleteIncident(id);
  }
}
