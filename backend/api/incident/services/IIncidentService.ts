import IncidentDto from './dto/IncidentDto';

export default interface IIncidentService {
  getIncidentList(): Promise<any[]>;
  getIncident(id: string): Promise<any>;
  upsertIndicent(dto: IncidentDto): Promise<IncidentDto>;
  deleteIncident(id: string): Promise<IncidentDto>;
}
