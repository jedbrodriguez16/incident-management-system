import UserInfoDto from "./dto/UserInfoDto";

export default interface IUserInfoService {
  getByToken(token: string): Promise<UserInfoDto>;
}
