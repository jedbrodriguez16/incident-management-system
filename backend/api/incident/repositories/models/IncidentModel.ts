import DbInfo from "../../../../common/annotation/DbInfo";
import { DatabaseEnum } from "../../enum/DatabaseEnum";

@DbInfo(DatabaseEnum.Incident.name)
export default class IncidentModel {
  id: string;
  rev: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  createdDate: string;
  createdBy: string;
  updatedDate: string;
  updatedBy: string;
  resolutionComment: string;
  docName: string;
}
