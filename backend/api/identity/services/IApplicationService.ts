import ApplicationDto from "./dto/ApplicationDto";

export default interface IApplicationService {
  getById(clientId: string): Promise<ApplicationDto>;
}
