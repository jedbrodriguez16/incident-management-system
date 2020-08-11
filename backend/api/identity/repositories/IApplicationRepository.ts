import ApplicationModel from "./model/ApplicationModel";

export default interface IApplicationRepository {
  getById(clientId: string): Promise<ApplicationModel>;
}
