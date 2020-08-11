import { PermissionModel } from "./PermissionModel";

import DbInfo from "../../../../common/annotation/DbInfo";
import { DatabaseEnum } from "../../enum/DatabaseEnum";

@DbInfo(DatabaseEnum.Group.name)
export class GroupModel {
  id: string;
  name: string;
  description: string;
  permissions: PermissionModel[];
  isEnabled: boolean;
}
