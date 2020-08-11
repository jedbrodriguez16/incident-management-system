import { Container } from "inversify";
import interceptorTypes from "./types";
import IUserInfoInterceptor from "./IUserInfoInterceptor";
import commonServiceTypes from "../services/types";
import IErrorHandlerService from "../services/IErrorHandlerService";

//factory for the interceptor that will work like meta data
export default function userInfo(iocContainer: Container) {
  return async function (req, res, next) {
    try {
      let userInfoInterceptor = iocContainer.get<IUserInfoInterceptor>(
        interceptorTypes.IUserInfoInterceptor
      );
      await userInfoInterceptor.invoke(req, res, next);
    } catch (e) {
      let errorHandler = iocContainer.get<IErrorHandlerService>(
        commonServiceTypes.IErrorHandlerService
      );
      errorHandler.handle(e, req, res, next);
    }
  };
}
