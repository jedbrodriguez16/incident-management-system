import { injectable } from "inversify";
import IIncidentRepository from "../IIncidentRepository";
import IncidentModel from "../models/IncidentModel";
import {
  CouchDbRepositoryBase,
  ViewQuery,
} from "../../../../common/repositories/CouchDbRepositoryBase";

@injectable()
export default class IncidentRepository extends CouchDbRepositoryBase
  implements IIncidentRepository {
  getModelClass() {
    return IncidentModel;
  }

  public async findAll(): Promise<IncidentModel[]> {
    let query = new ViewQuery("doc", "by-id");
    return super.findAll(query);
  }
}
