import ServiceException from "./ServiceException";

export default class RpcServiceException extends ServiceException {
  constructor(message?: string) {
    super(message);
  }
}
