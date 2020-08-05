import { injectable } from "inversify";
import IIncidentRepository from "../IIncidentRepository";
import IncidentModel from "../models/IncidentModel";
import {
  CouchDbRepositoryBase,
  ViewQuery,
  ViewSortingEnum,
} from "../../../../common/repositories/CouchDbRepositoryBase";

enum ViewDocNameEnum {
  Incident = "incident",
}

enum ViewIndexNameEnum {
  Assignee = "by-assignee",
  Date = "by-date",
  Status = "by-status",
}

@injectable()
export default class IncidentRepository extends CouchDbRepositoryBase
  implements IIncidentRepository {
  getModelClass() {
    return IncidentModel;
  }

  public getList(): Promise<IncidentModel[]> {
    let query = new ViewQuery(
      ViewDocNameEnum.Incident,
      ViewIndexNameEnum.Date,
      ViewSortingEnum.desc
    );
    return super.findAll(query);
  }

  public getById(id: string): Promise<IncidentModel> {
    return super.findOne(id);
  }

  public add(model: IncidentModel): Promise<IncidentModel> {
    return super.save(model);
  }

  public async delete(id: string): Promise<IncidentModel> {
    let incident = await this.getById(id);
    return super.remove(incident.id, incident.rev);
  }
}
