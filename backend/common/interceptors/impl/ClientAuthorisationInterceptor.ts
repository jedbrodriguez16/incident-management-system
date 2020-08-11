import { injectable, inject } from "inversify";
import * as express from "express";
import IClientAuthorisationInterceptor from "../IClientAuthorisationInterceptor";
import IClientAuthorisationService from "../../services/IClientAuthorisationService";
import commonServiceTypes from "../../services/types";

@injectable()
export default class ClientAuthorisationInterceptor
  implements IClientAuthorisationInterceptor {
  @inject(commonServiceTypes.IClientAuthorisationService)
  private _clientAuthorisationService: IClientAuthorisationService;

  async invoke(
    resource: string,
    action: string,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    let headers = req.headers || {};
    let authorisation: string = <string>headers.authorization || "Bearer ";
    let token = authorisation.split(" ")[1];
    if (token) {
      let isAuthorized = await this._clientAuthorisationService.isAuthorized(
        resource,
        action,
        token
      );
      if (isAuthorized === false) {
        res.status(401);
        res.send({
          message: "access denied",
        });
      } else {
        next();
      }
    } else {
      res.status(401);
      res.send({
        message: "auth token required",
      });
    }
  }
}
