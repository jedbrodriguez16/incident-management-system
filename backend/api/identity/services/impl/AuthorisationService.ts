import * as _ from "underscore";
import IAuthorisationService from "../IAuthorisationService";
import { injectable, inject } from "inversify";
import types from "../types";
import commonTypes from "../../../../common/services/types";
import IGroupService from "../IGroupService";
import ILogService from "../../../../common/services/ILogService";

@injectable()
export default class AuthorisationService implements IAuthorisationService {
  @inject(types.IGroupService)
  private readonly _groupService: IGroupService;

  @inject(commonTypes.ILogService)
  private readonly _logService: ILogService;

  async isAllowed(
    resource: string,
    action: string,
    groups: string[]
  ): Promise<boolean> {
    let isallowed = false;
    this._logService.info({
      resource: resource,
      action: action,
      groups: groups,
    });
    if (resource && groups && groups.length > 0) {
      const permissions = await this._getPermissions(groups);
      const resourcePermissions =
        _.where(permissions, { resource: resource, action: action }) || [];
      if (resourcePermissions.length === 0) {
        isallowed = false;
      } else {
        const deniedAccess =
          _.where(resourcePermissions, { isAllowed: false }) || [];
        if (deniedAccess.length > 0) {
          isallowed = false;
        } else {
          const accessGranted =
            _.where(resourcePermissions, { isAllowed: true }) || [];
          isallowed = accessGranted.length > 0;
        }
      }
    }
    return isallowed;
  }

  private async _getPermissions(groupNames: string[]) {
    const permissions = [];
    if (groupNames && groupNames.length > 0) {
      const groups = await this._groupService.getGroupsByNames(groupNames);
      if (groups && groups.length) {
        groups.forEach((group) => {
          if (group.permissions && group.permissions.length) {
            group.permissions.forEach((permission) => {
              const statement = Object.assign({ group: group.id }, permission);
              permissions.push(statement);
            });
          }
        });
      }
    }
    return permissions;
  }
}
