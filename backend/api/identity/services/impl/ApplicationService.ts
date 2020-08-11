import { injectable, inject } from "inversify";

import ServiceBase from "../../../../common/services/ServiceBase";
import repoTypes from "../../repositories/types";
import IApplicationRepository from "../../repositories/IApplicationRepository";
import ApplicationDto from "../dto/ApplicationDto";

@injectable()
export default class ApplicationService extends ServiceBase {
  @inject(repoTypes.IApplicationRepository)
  private _applicationRepository: IApplicationRepository;

  getDtoClass(): any {
    return ApplicationDto;
  }

  async getById(clientId: string): Promise<ApplicationDto> {
    const applicationModel = await this._applicationRepository.getById(
      clientId
    );
    return this.toDto(applicationModel);
  }
}
