export default interface IIncidentRepository {
  findAll(): Promise<any>;
}
