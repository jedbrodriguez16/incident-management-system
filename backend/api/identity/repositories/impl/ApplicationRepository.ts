import { injectable } from "inversify";

import { CouchDbRepositoryBase } from "../../../../common/repositories/impl/CouchDbRepositoryBase";
import ApplicationModel from "../model/ApplicationModel";
import IApplicationRepository from "../IApplicationRepository";

@injectable()
export default class ApplicationRepository extends CouchDbRepositoryBase
  implements IApplicationRepository {
  getModelClass(): any {
    return ApplicationModel;
  }

  async getById(clientId: string): Promise<ApplicationModel> {
    return super.findById(clientId);
  }
}
