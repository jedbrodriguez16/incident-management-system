import { injectable, inject } from "inversify";
import IIncidentService from "../IIncidentService";
import IIncidentRepository from "../../repositories/IIncidentRepository";
import IncidentDto from "../dto/IncidentDto";
import types from "../../repositories/types";
import ServiceBase from "../../../../common/services/ServiceBase";
import { plainToClass } from 'class-transformer';
import IncidentModel from "../../repositories/models/IncidentModel";

@injectable()
export default class IncidentService extends ServiceBase implements IIncidentService {
  @inject(types.IIncidentRepository)
  private readonly _incidentRepository: IIncidentRepository;

  getDtoClass() {
    return IncidentDto;
  }

  public async getIncidentList(): Promise<IncidentDto[]> {
    let incidentList = await this._incidentRepository.getList();
    return this.toDto(incidentList);
  }

  public async getIncident(id: string): Promise<IncidentDto> {
    let incident = await this._incidentRepository.getById(id);
    return this.toDto(incident);
  }

  public async upsertIndicent(dto: IncidentDto): Promise<IncidentDto> {
    let incident = await this._incidentRepository.add(plainToClass(IncidentModel, dto))
    return this.toDto(incident);
  }

  public async deleteIncident(id: string): Promise<IncidentDto> {
    let incident = await this._incidentRepository.delete(id);
    return this.toDto(incident);
  }
}
