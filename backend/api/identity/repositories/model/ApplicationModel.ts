import DbInfo from "../../../../common/annotation/DbInfo";
import { DatabaseEnum } from "../../enum/DatabaseEnum";

@DbInfo(DatabaseEnum.Application.name)
export default class ApplicationModel {
  id: string;
  clientId: string;
  clientSecret: string;
  name: string;
  isEnabled: boolean;
}
