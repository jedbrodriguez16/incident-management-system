import ServiceException from "./ServiceException";

export default class SecurityServiceException extends ServiceException {
  constructor(message?: string) {
    super(message);
  }
}
