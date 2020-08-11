import { Container } from "inversify";
import interceptorTypes from "./types";
import IClientAuthorisationInterceptor from "./IClientAuthorisationInterceptor";
import commonServiceTypes from "../services/types";
import IErrorHandlerService from "../services/IErrorHandlerService";

//factory for the interceptor that will work like meta data
export function authorisation(
  iocContainer: Container,
  resource: string,
  action: string
) {
  return async function (req, res, next) {
    try {
      let authorisationHandler = iocContainer.get<
        IClientAuthorisationInterceptor
      >(interceptorTypes.IClientAuthorisationInterceptor);
      await authorisationHandler.invoke(resource, action, req, res, next);
    } catch (err) {
      let errorHandler = iocContainer.get<IErrorHandlerService>(
        commonServiceTypes.IErrorHandlerService
      );
      errorHandler.handle(err, req, res, next);
    }
  };
}
