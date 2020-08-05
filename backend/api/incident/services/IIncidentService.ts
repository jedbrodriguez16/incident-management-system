import IncidentDto from "./dto/IncidentDto";

export default interface IIncidentService {
  getIncidentList(): Promise<IncidentDto[]>;
  getIncident(id: string): Promise<IncidentDto>;
  upsertIndicent(dto: IncidentDto): Promise<IncidentDto>;
  deleteIncident(id: string): Promise<IncidentDto>;
}
