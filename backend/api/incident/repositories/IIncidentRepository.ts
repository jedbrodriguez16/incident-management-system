import IncidentModel from "./models/IncidentModel";

export default interface IIncidentRepository {
  getList(): Promise<IncidentModel[]>;
  getById(id: string): Promise<IncidentModel>;
}
