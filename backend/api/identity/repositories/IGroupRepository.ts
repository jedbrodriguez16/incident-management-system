import { GroupModel } from "./model/GroupModel";

export default interface IGroupRepository {
  getList(): Promise<GroupModel[]>;
  getByName(name: string): Promise<GroupModel>;
}
