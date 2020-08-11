import UserIdentityModel from "./model/UserIdentityModel";

export default interface IUserIdentityRepository {
  getByUsername(username: string): Promise<UserIdentityModel>;
  getList(): Promise<UserIdentityModel[]>;
}
