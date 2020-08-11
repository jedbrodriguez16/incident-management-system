import ServiceException from "./ApplicationException";

export default class UnAuthorizedAccessException extends ServiceException {
  getStatus() {
    return 401;
  }
}
