import { injectable, inject } from "inversify";

import commonTypes from "../../../../common/services/types";
import AuthenticationFailedException from "../../../../common/exception/AuthenticationFailedException";
import types from "../types";
import IAuthenticationService from "../IAuthenticationService";
import IUserIdentityService from "../IUserIdentityService";
import IGroupService from "../IGroupService";
import IFlowService from "../../../../common/services/IFlowService";
import AuthenticationResultDto from "../dto/AuthenticationResultDto";
import AuthenticationDto from "../dto/AuthenticationDto";
import IApplicationService from "../IApplicationService";

@injectable()
export default class AuthenticationService implements IAuthenticationService {
  @inject(types.IApplicationService)
  private readonly _applicationService: IApplicationService;

  @inject(types.IUserIdentityService)
  private readonly _userService: IUserIdentityService;

  @inject(types.IGroupService)
  private readonly _groupService: IGroupService;

  @inject(commonTypes.IFlowService)
  private readonly _flowService: IFlowService;

  getDtoClass(): any {
    return AuthenticationResultDto;
  }

  async login(credential: AuthenticationDto): Promise<AuthenticationResultDto> {
    const result = new AuthenticationResultDto();
    result.isSuccess = false;
    const [isApplicationLoginSuccess] = await this._applicationLoginAccess(
      credential
    );
    if (isApplicationLoginSuccess === true) {
      const [isUserLoginSuccess, userDto] = await this._userLogin(credential);
      if (isUserLoginSuccess === true) {
        result.isSuccess = true;
        result.username = credential.username;
        result.displayName = userDto.displayName || credential.username;
        result.groups = await this._getGroupsByIds(userDto.groups);
      }
    }
    if (result.isSuccess === false) {
      throw new AuthenticationFailedException("Credential invalid");
    }
    if (result.groups && result.groups.length === 0) {
      throw new AuthenticationFailedException("Credential invalid");
    }
    return result;
  }

  private async _applicationLoginAccess(
    credential: AuthenticationDto
  ): Promise<any[]> {
    const applicationDto = await this._applicationService.getById(
      credential.clientId
    );
    return [
      applicationDto &&
        applicationDto.isEnabled === true &&
        applicationDto.clientSecret === credential.clientSecret,
      applicationDto,
    ];
  }

  private async _userLogin(credential: AuthenticationDto): Promise<any[]> {
    const userDto = await this._userService.getByUsername(credential.username);
    return [
      userDto &&
        userDto.isEnabled === true &&
        userDto.password === credential.password,
      userDto,
    ];
  }

  private _getGroupsByIds(ids: string[]): Promise<string[]> {
    return this._flowService
      .each(ids, (id) => {
        return this._groupService.getGroupByName(id);
      })
      .then((groups) => {
        return groups.filter((group) => group.isEnabled);
      })
      .then((groups) => {
        return groups.map((group) => group.id);
      });
  }
}
