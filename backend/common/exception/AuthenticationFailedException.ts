import ApplicationException from "./ApplicationException";

export default class AuthenticationFailedException extends ApplicationException {
  getStatus() {
    return 401;
  }
}
