import { injectable, inject } from "inversify";
import IIncidentService from "../IIncidentService";
import IIncidentRepository from "../../repositories/IIncidentRepository";
import IncidentDto from "../dto/IncidentDto";
import types from "../../repositories/types";
import ServiceBase from "../../../../common/services/ServiceBase";
import { plainToClass } from "class-transformer";
import IncidentModel from "../../repositories/models/IncidentModel";
import UserInfoDto from "../../../../common/services/dto/UserInfoDto";
import {
  ViewQuery,
  ViewSortingEnum,
} from "../../../../common/repositories/impl/CouchDbRepositoryBase";
import {
  ViewIndexNameEnum,
  ViewDocNameEnum,
} from "../../repositories/impl/IncidentRepository";

@injectable()
export default class IncidentService extends ServiceBase
  implements IIncidentService {
  @inject(types.IIncidentRepository)
  private readonly _incidentRepository: IIncidentRepository;

  getDtoClass() {
    return IncidentDto;
  }

  public async getIncidentList(
    user: UserInfoDto,
    sortBy: string
  ): Promise<IncidentDto[]> {
    let viewIndexName = ViewIndexNameEnum.Date;
    let viewKey: string | string[] = undefined;
    let sortOrder: ViewSortingEnum = ViewSortingEnum.Descending;

    if (user) {
      if (
        user.groups &&
        user.groups.length > 0 &&
        user.groups.includes("admin")
      ) {
        if (sortBy === "assignee") {
          viewIndexName = ViewIndexNameEnum.Assignee;
          sortOrder = ViewSortingEnum.Ascending;
        } else if (sortBy === "status") {
          viewIndexName = ViewIndexNameEnum.Status;
          sortOrder = ViewSortingEnum.Ascending;
        } else {
          viewIndexName = ViewIndexNameEnum.Date;
        }
      } else {
        viewIndexName = ViewIndexNameEnum.Assignee;
        viewKey = user.username;
      }
    } else {
      viewIndexName = ViewIndexNameEnum.Date;
    }

    let query = new ViewQuery(
      ViewDocNameEnum.Incident,
      viewIndexName,
      sortOrder,
      viewKey
    );

    let incidentList = await this._incidentRepository.getList(query);
    return this.toDto(incidentList);
  }

  public async getIncident(id: string): Promise<IncidentDto> {
    let incident = await this._incidentRepository.getById(id);
    return this.toDto(incident);
  }

  public async upsertIndicent(dto: IncidentDto): Promise<IncidentDto> {
    let incident = await this._incidentRepository.add(
      plainToClass(IncidentModel, dto)
    );
    return this.toDto(incident);
  }

  public async deleteIncident(id: string): Promise<IncidentDto> {
    let incident = await this._incidentRepository.delete(id);
    return this.toDto(incident);
  }
}
