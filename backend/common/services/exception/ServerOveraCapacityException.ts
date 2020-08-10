import ServiceException from "./ServiceException";

export default class ServerOveraCapacityException extends ServiceException {
  constructor(message?: string) {
    super(message);
  }
}
