import { Container } from "inversify";
import types from "./types";
import IApplicationRepository from "./IApplicationRepository";
import ApplicationRepository from "./impl/ApplicationRepository";
import IGroupRepository from "./IGroupRepository";
import GroupRepository from "./impl/GroupRepository";
import IUserIdentityRepository from "./IUserIdentityRepository";
import UserIdentityRepository from "./impl/UserIdentityRepository";

export default function configureRepositories(container: Container) {
  container
    .bind<IApplicationRepository>(types.IApplicationRepository)
    .to(ApplicationRepository)
    .inSingletonScope();
  container
    .bind<IGroupRepository>(types.IGroupRepository)
    .to(GroupRepository)
    .inSingletonScope();
  container
    .bind<IUserIdentityRepository>(types.IUserIdentityRepository)
    .to(UserIdentityRepository)
    .inSingletonScope();
  return container;
}
