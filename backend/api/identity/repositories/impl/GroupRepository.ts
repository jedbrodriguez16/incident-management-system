import IGroupRepository from "../IGroupRepository";
import { GroupModel } from "../model/GroupModel";
import {
  ViewQuery,
  ViewSortingEnum,
  CouchDbRepositoryBase,
} from "../../../../common/repositories/impl/CouchDbRepositoryBase";

enum ViewDocNameEnum {
  Group = "group",
}

enum ViewIndexNameEnum {
  Id = "by-id",
}

export default class GroupRepository extends CouchDbRepositoryBase
  implements IGroupRepository {
  getModelClass(): any {
    return GroupModel;
  }

  getList(): Promise<GroupModel[]> {
    return super.findOne(
      new ViewQuery(
        ViewDocNameEnum.Group,
        ViewIndexNameEnum.Id,
        ViewSortingEnum.Ascending
      )
    );
  }

  getByName(name: string): Promise<GroupModel> {
    return super.findById(name);
  }
}
