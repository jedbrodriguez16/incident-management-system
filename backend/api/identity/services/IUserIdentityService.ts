import UserIdentityDto from "./dto/UserIdentityDto";

export default interface IUserIdentityService {
  getByUsername(username: string): Promise<UserIdentityDto>;
  getList(): Promise<UserIdentityDto[]>;
}
