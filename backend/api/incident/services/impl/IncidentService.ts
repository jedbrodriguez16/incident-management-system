import { injectable, inject } from "inversify";
import IIncidentService from "../IIncidentService";
import IIncidentRepository from "../../repositories/IIncidentRepository";
import IncidentDto from "../dto/IncidentDto";
import types from "../../repositories/types";

@injectable()
export default class IncidentService implements IIncidentService {
  @inject(types.IIncidentRepository)
  private readonly _incidentRepository: IIncidentRepository;

  public getIncidentList(): Promise<IncidentDto[]> {
    return this._incidentRepository.findAll();
  }
}
