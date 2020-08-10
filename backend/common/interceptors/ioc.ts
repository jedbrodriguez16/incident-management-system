import { Container } from "inversify";
import types from "./types";
import IClientAuthorisationInterceptor from "./IClientAuthorisationInterceptor";
import ClientAuthorisationInterceptor from "./impl/ClientAuthorisationInterceptor";

import IUserInfoInterceptor from "./IUserInfoInterceptor";
import UserInfoInterceptor from "./impl/UserInfoInterceptor";

export default function configureCommonInterceptors(
  iocContainer: Container
): Container {
  iocContainer
    .bind<IClientAuthorisationInterceptor>(
      types.IClientAuthorisationInterceptor
    )
    .to(ClientAuthorisationInterceptor)
    .inSingletonScope();
  iocContainer
    .bind<IUserInfoInterceptor>(types.IUserInfoInterceptor)
    .to(UserInfoInterceptor)
    .inSingletonScope();
  return iocContainer;
}
