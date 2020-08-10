import { injectable, inject } from "inversify";
import UserInfoDto from "./../dto/UserInfoDto";
import IUserInfoService from "../IUserInfoService";
import commonServiceTypes from "../types";
import IConfigService from "../IConfigService";
import IClientProxyService from "../IClientProxyService";
import BaseService from "./BaseService";

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

  async getByToken(token: string): Promise<UserInfoDto> {
    let decryptionEndpoint = this._configService.getDecryptEndpoint();
    let response = await this._clientProxyService.invoke({
      token: token,
      url: decryptionEndpoint,
      payload: {},
    });
    return {
      userId: response.payload.userId,
      displayName: response.payload.displayName,
      groups: response.payload.groups,
    };
  }
}
