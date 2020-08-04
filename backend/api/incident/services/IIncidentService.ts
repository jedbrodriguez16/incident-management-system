export default interface IIncidentService {
  getIncidentList(): Promise<any[]>;
  getIncident(id: string): Promise<any>;
}
