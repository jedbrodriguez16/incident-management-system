import {
  CouchDbRepositoryBase,
  ViewQuery,
  ViewSortingEnum,
} from "../../../../common/repositories/impl/CouchDbRepositoryBase";
import IUserIdentityRepository from "../IUserIdentityRepository";
import UserIdentityModel from "../model/UserIdentityModel";

enum ViewDocNameEnum {
  User = "user",
}

enum ViewIndexNameEnum {
  Id = "by-id",
}

export default class UserIdentityRepository extends CouchDbRepositoryBase
  implements IUserIdentityRepository {
  getModelClass(): any {
    return UserIdentityModel;
  }

  getByUsername(username: string): Promise<UserIdentityModel> {
    return super.findById(username);
  }

  getList(): Promise<UserIdentityModel[]> {
    return super.findAll(
      new ViewQuery(
        ViewDocNameEnum.User,
        ViewIndexNameEnum.Id,
        ViewSortingEnum.Ascending
      )
    );
  }
}
