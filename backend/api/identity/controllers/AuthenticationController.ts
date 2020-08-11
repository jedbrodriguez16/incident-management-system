import { controller, httpPost, httpGet } from "inversify-express-utils";
import iocContainer from "../iocContainer";
import * as express from "express";
import { inject } from "inversify";
import IJwtService from "../services/IJwtService";
import types from "../services/types";
import commonTypes from "../../../common/services/types";
import BaseController from "../../../common/controller/BaseController";
import IHttpService from "../../../common/services/IHttpService";
import { authorisation } from "../../../common/interceptors/authorisationFactory";
import IAuthorisationService from "../services/IAuthorisationService";

const controllerName: string = "authentication";
@controller("/api/auth")
export default class AuthenticationController extends BaseController {
  @inject(types.IJwtService)
  private readonly _jwtService: IJwtService;

  @inject(commonTypes.IHttpService)
  private readonly _httpService: IHttpService;

  @inject(types.IAuthorisationService)
  private readonly _authorisationService: IAuthorisationService;

  @httpPost("/login")
  login(req: express.Request) {
    const { username, password, clientId, clientSecret } = this.params(req);
    return this._jwtService.login({
      clientId,
      clientSecret,
      username,
      password,
    });
  }

  @httpGet("/decrypt", authorisation(iocContainer, controllerName, "decrypt"))
  decrypt(req: express.Request) {
    const bearerToken = this._httpService.getBearerToken(req);
    return this._jwtService.decrypt(bearerToken);
  }

  @httpPost("/authorized")
  async isAuthorized(request: any) {
    const { resource, action } = this.params(request);
    const bearerToken = this._httpService.getBearerToken(request);
    const info: any = await this._jwtService.decrypt(bearerToken);
    const isAllowed = await this._authorisationService.isAllowed(
      resource,
      action,
      info.groups
    );
    return {
      resource: resource,
      action: action,
      isAuthorized: isAllowed,
    };
  }
}
