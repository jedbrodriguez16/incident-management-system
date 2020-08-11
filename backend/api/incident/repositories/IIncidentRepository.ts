import IncidentModel from "./models/IncidentModel";
import { ViewQuery } from "../../../common/repositories/impl/CouchDbRepositoryBase";

export default interface IIncidentRepository {
  getList(query: ViewQuery): Promise<IncidentModel[]>;
  getById(id: string): Promise<IncidentModel>;
  add(model: IncidentModel): Promise<IncidentModel>;
  delete(id: string): Promise<IncidentModel>;
}
