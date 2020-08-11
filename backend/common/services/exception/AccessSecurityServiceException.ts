import SecurityServiceException from "./SecurityServiceException";

export default class AccessSecurityServiceException extends SecurityServiceException {
  constructor(message?: string) {
    super(message);
  }
}
