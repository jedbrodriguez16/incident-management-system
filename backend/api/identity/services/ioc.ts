import { Container } from "inversify";
import * as jwt from "jsonwebtoken";
import types from "./types";
import IApplicationService from "./IApplicationService";
import ApplicationService from "./impl/ApplicationService";
import IGroupService from "./IGroupService";
import GroupService from "./impl/GroupService";
import IUserIdentityService from "./IUserIdentityService";
import UserIdentityService from "./impl/UserIdentityService";
import IJwtService from "./IJwtService";
import JwtService from "./impl/JwtService";
import IAuthConfigService from "./IAuthConfigService";
import AuthConfigService from "./impl/AuthConfigService";
import IAuthenticationService from "./IAuthenticationService";
import AuthenticationService from "./impl/AuthenticationService";
import IAuthorisationService from "./IAuthorisationService";
import AuthorisationService from "./impl/AuthorisationService";

export default function configureServices(container: Container) {
  container.bind<any>(types.JwtLib).toConstantValue(jwt);
  container
    .bind<IApplicationService>(types.IApplicationService)
    .to(ApplicationService)
    .inSingletonScope();
  container
    .bind<IGroupService>(types.IGroupService)
    .to(GroupService)
    .inSingletonScope();
  container
    .bind<IUserIdentityService>(types.IUserIdentityService)
    .to(UserIdentityService)
    .inSingletonScope();
  container
    .bind<IJwtService>(types.IJwtService)
    .to(JwtService)
    .inSingletonScope();
  container
    .bind<IAuthConfigService>(types.IAuthConfigService)
    .to(AuthConfigService)
    .inSingletonScope();
  container
    .bind<IAuthenticationService>(types.IAuthenticationService)
    .to(AuthenticationService)
    .inSingletonScope();
  container
    .bind<IAuthorisationService>(types.IAuthorisationService)
    .to(AuthorisationService)
    .inSingletonScope();
  return container;
}
