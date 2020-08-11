import { injectable, inject } from "inversify";
import UserInfoDto from "./../dto/UserInfoDto";
import IUserInfoService from "../IUserInfoService";
import commonServiceTypes from "../types";
import IConfigService from "../IConfigService";
import IClientProxyService from "../IClientProxyService";
import BaseService from "./BaseService";
import HttpMethodEnum from "../../enum/HttpMethodEnum";

@injectable()
export default class UserInfoService extends BaseService
  implements IUserInfoService {
  @inject(commonServiceTypes.IConfigService)
  protected _configService: IConfigService;

  @inject(commonServiceTypes.IClientProxyService)
  protected _clientProxyService: IClientProxyService;

  getDtoClass(): Function {
    return UserInfoDto;
  }

  async getByToken(token: string): Promise<any> {
    let decryptionEndpoint = this._configService.getDecryptEndpoint();
    let response = await this._clientProxyService.invoke({
      method: HttpMethodEnum.get,
      token: token,
      url: decryptionEndpoint,
      payload: {},
    });
    let decryptedValue = JSON.parse(response.payload);
    return {
      username: decryptedValue.username,
      displayName: decryptedValue.displayName,
      groups: decryptedValue.groups,
    };
  }
}
