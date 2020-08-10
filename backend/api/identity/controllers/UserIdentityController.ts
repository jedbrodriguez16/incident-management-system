import * as _ from "underscore";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";

import IUserIdentityService from "../services/IUserIdentityService";
import types from "../services/types";
import { authorisation } from "../../../common/interceptors/authorisationFactory";
import iocContainer from "../iocContainer";

@controller("/api/users")
export class UserIdentityController {
  @inject(types.IUserIdentityService)
  private readonly _userIdentityService: IUserIdentityService;

  @httpGet("/", authorisation(iocContainer, "user", "get-list"))
  public getUsers() {
    return this._userIdentityService.getList();
  }
}
