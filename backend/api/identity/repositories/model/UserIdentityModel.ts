import DbInfo from "../../../../common/annotation/DbInfo";
import { DatabaseEnum } from "../../enum/DatabaseEnum";

@DbInfo(DatabaseEnum.User.name)
export default class UserIdentityModel {
  id: string;
  username: string;
  password: string;
  displayName: string;
  isEnabled: boolean;
  groups: string[];
}
