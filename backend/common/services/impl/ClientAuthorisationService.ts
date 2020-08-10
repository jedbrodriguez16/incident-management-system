import { injectable, inject } from "inversify";
import commonServiceTypes from "../types";
import IClientAuthorisationService from "../IClientAuthorisationService";
import IConfigService from "../IConfigService";
import IClientProxyService from "../IClientProxyService";
import HttpMethod from "../../enum/HttpMethodEnum";

@injectable()
export default class ClientAuthorisationService
  implements IClientAuthorisationService {
  @inject(commonServiceTypes.IConfigService)
  private _configService: IConfigService;

  @inject(commonServiceTypes.IClientProxyService)
  private _clientProxyService: IClientProxyService;

  async isAuthorized(
    resource: string,
    action: string,
    token: string
  ): Promise<boolean> {
    let authorisationEndpoint = this._configService.getAuthorisationEndpoint();
    let response = await this._clientProxyService.invoke({
      token: token,
      method: HttpMethod.post,
      url: authorisationEndpoint,
      payload: {
        resource: resource,
        action: action,
      },
    });
    return response.status === 200 && response.payload.isAuthorized === true;
  }
}
