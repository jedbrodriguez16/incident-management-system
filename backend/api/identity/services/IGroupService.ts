import GroupDto from "./dto/GroupDto";

export default interface IGroupService {
  getList(): Promise<GroupDto[]>;
  getGroupByName(name: string): Promise<GroupDto>;
  getGroupsByNames(names: string[]): Promise<GroupDto[]>;
}
