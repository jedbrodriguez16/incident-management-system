import { Container } from "inversify";
import * as crypto from "crypto";
import * as config from "config";

import types from "./types";
import IFlowService from "./IFlowService";
import FlowService from "./impl/FlowService";
import IUtilService from "./IUtilService";
import UtilService from "./impl/UtilService";
import IConfigService from "./IConfigService";
import ConfigService from "./impl/ConfigService";
import ILogService from "./ILogService";
import LogService from "./impl/LogService";
import IReflectionService from "./IReflectionService";
import ReflectionService from "./impl/ReflectionService";
import IDateService from "./IDateService";
import DateService from "./impl/DateService";
import IHttpService from "./IHttpService";
import HttpService from "./impl/HttpService";
import IErrorHandlerService from "./IErrorHandlerService";
import ErrorHandlerService from "./impl/ErrorHandlerService";
import IClientProxyService from "./IClientProxyService";
import ClientProxyService from "./impl/ClientProxyService";
import IClientAuthorisationService from "./IClientAuthorisationService";
import ClientAuthorisationService from "./impl/ClientAuthorisationService";
import IUserInfoService from "./IUserInfoService";
import UserInfoService from "./impl/UserInfoService";

export default function configureCommonServices(container: Container) {
  container.bind<any>(types.EnvironmentVariables).toConstantValue(process.env);
  container.bind<any>(types.Logger).toConstantValue(console);
  container.bind<any>(types.ConfigLoader).toConstantValue(config);
  container.bind<any>(types.CryptoLib).toConstantValue(crypto);
  container
    .bind<IFlowService>(types.IFlowService)
    .to(FlowService)
    .inSingletonScope();
  container
    .bind<IUtilService>(types.IUtilService)
    .to(UtilService)
    .inSingletonScope();
  container
    .bind<IConfigService>(types.IConfigService)
    .to(ConfigService)
    .inSingletonScope();
  container
    .bind<ILogService>(types.ILogService)
    .to(LogService)
    .inSingletonScope();
  container
    .bind<IReflectionService>(types.IReflectionService)
    .to(ReflectionService)
    .inSingletonScope();
  container
    .bind<IDateService>(types.IDateService)
    .to(DateService)
    .inSingletonScope();
  container
    .bind<IHttpService>(types.IHttpService)
    .to(HttpService)
    .inSingletonScope();
  container
    .bind<IErrorHandlerService>(types.IErrorHandlerService)
    .to(ErrorHandlerService)
    .inSingletonScope();
  container
    .bind<IClientProxyService>(types.IClientProxyService)
    .to(ClientProxyService)
    .inSingletonScope();
  container
    .bind<IClientAuthorisationService>(types.IClientAuthorisationService)
    .to(ClientAuthorisationService)
    .inSingletonScope();
  container
    .bind<IUserInfoService>(types.IUserInfoService)
    .to(UserInfoService)
    .inSingletonScope();

  // for reload for config
  const logService = container.get<ILogService>(types.ILogService);
  const configService = container.get<IConfigService>(types.IConfigService);
  configService
    .load()
    .then(() => {
      logService.info("successfully loaded config");
    })
    .catch((err) => {
      logService.error(err);
    });
  return container;
}
