import * as _ from "underscore";

export default class ApplicationException extends Error {
  private _innerException: ApplicationException;

  constructor(ex?: any) {
    if (ex instanceof ApplicationException) {
      super(ex.message);
      this._innerException = ex;
    } else if (ex instanceof Error) {
      super(ex.message);
    } else {
      let message;
      if (_.isObject(ex) && _.isString(ex.message)) {
        message = ex.message;
      } else {
        message = ex;
      }
      super(message);
    }
  }

  get innerException() {
    return this._innerException;
  }
}
