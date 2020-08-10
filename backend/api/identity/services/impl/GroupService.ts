import IGroupService from "../IGroupService";
import ServiceBase from "../../../../common/services/ServiceBase";
import IFlowService from "../../../../common/services/IFlowService";
import { injectable, inject } from "inversify";
import GroupDto from "../dto/GroupDto";
import IGroupRepository from "../../repositories/IGroupRepository";
import repoTypes from "../../repositories/types";
import commonTypes from "../../../../common/services/types";

@injectable()
export default class GroupService extends ServiceBase implements IGroupService {
  @inject(repoTypes.IGroupRepository)
  private readonly _groupRepository: IGroupRepository;

  @inject(commonTypes.IFlowService)
  private readonly _flowService: IFlowService;

  getDtoClass(): any {
    return GroupDto;
  }

  getList(): Promise<GroupDto[]> {
    return this._groupRepository.getList().then((groups) => {
      return this.toDto(groups);
    });
  }

  getGroupByName(name: string): Promise<GroupDto> {
    return this._groupRepository.getByName(name).then((group) => {
      return this.toDto(group);
    });
  }

  getGroupsByNames(names: string[]): Promise<GroupDto[]> {
    const self = this;
    return this._flowService.each(names, (group) => {
      return self.getGroupByName(group);
    });
  }
}
