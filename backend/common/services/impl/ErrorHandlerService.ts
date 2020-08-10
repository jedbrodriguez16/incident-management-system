import { injectable, inject } from "inversify";
import IErrorHandlerService from "../IErrorHandlerService";
import ILogService from "../ILogService";
import commonServiceTypes from "../types";
import AccessSecurityServiceException from "../exception/AccessSecurityServiceException";
import RpcServiceException from "../exception/RpcServiceException";
import UnAuthorizedAccessException from "../../exception/UnAuthorizedAccessException";

@injectable()
export default class ErrorHandlerService implements IErrorHandlerService {
  @inject(commonServiceTypes.ILogService)
  private _logService: ILogService;

  // @ts-ignore
  handle(error: any, req: any, res: any, next: any) {
    let status: string = "500";
    if (
      error instanceof AccessSecurityServiceException ||
      error.innerException instanceof AccessSecurityServiceException
    ) {
      status = "401";
    } else if (error instanceof UnAuthorizedAccessException) {
      status = "403";
    } else if (
      error instanceof RpcServiceException ||
      error.innerException instanceof RpcServiceException
    ) {
      status = "500";
    } else {
      status = error.status;
    }
    let payload = {
      message: error.message,
    };
    if (!status) {
      status = "500";
    }
    let statusId = parseInt(status);
    if (statusId === 401) {
      payload.message = "access denied";
    }
    this._logService.error(error);
    res.status(statusId);
    res.send(payload);
  }
}
