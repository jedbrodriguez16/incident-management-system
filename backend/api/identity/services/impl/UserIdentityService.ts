import { injectable, inject } from "inversify";
import UserIdentityDto from "../dto/UserIdentityDto";
import IUserIdentityRepository from "../../repositories/IUserIdentityRepository";
import ServiceBase from "../../../../common/services/ServiceBase";
import repoTypes from "../../repositories/types";
import IUserIdentityService from "../IUserIdentityService";

@injectable()
export default class UserIdentityService extends ServiceBase
  implements IUserIdentityService {
  @inject(repoTypes.IUserIdentityRepository)
  private readonly _userRepository: IUserIdentityRepository;

  getDtoClass(): any {
    return UserIdentityDto;
  }

  async getByUsername(username: string): Promise<UserIdentityDto> {
    const model = await this._userRepository.getByUsername(username);
    return this.toDto(model);
  }

  async getList(): Promise<UserIdentityDto[]> {
    const users = await this._userRepository.getList();
    return this.toDto(users);
  }
}
