const types = {
  Logger: Symbol.for("logger-util"),
  EnvironmentVariables: Symbol.for("EnvironmentVariables"),
  ConfigLoader: Symbol.for("config-loader"),
  CryptoLib: Symbol.for("crypto-lib"),
  IFlowService: Symbol.for("IFlowService"),
  IUtilService: Symbol.for("IUtilService"),
  IConfigService: Symbol.for("IConfigService"),
  ILogService: Symbol.for("ILogService"),
  IReflectionService: Symbol.for("IReflectionService"),
  IDateService: Symbol.for("IDateService"),
  IHttpService: Symbol.for("IHttpService"),
  IErrorHandlerService: Symbol.for("IErrorHandlerService"),
  IClientProxyService: Symbol.for("IClientProxyService"),
  IClientAuthorisationService: Symbol.for("IClientAuthorisationService"),
  IUserInfoService: Symbol.for("IUserInfoService"),
};
export default types;
