import { injectable, inject } from "inversify";

import types from "../types";
import ILogService from "../ILogService";
import { LogTypeEnum } from "../../enum/LogTypeEnum";

@injectable()
export default class LogService implements ILogService {
  @inject(types.Logger)
  private _logger: any;

  log(logType: LogTypeEnum, message: any): void {
    if (logType === LogTypeEnum.Error) {
      this.error(message);
    } else if (logType === LogTypeEnum.Warning) {
      this.warning(message);
    } else {
      this.info(message);
    }
  }

  info(message: any): void {
    this._logger.info("info: ", { info: message });
  }

  error(message: any): void {
    this._logger.error("error: ", { info: message });
  }

  warning(message: any): void {
    this._logger.warn("warn: ", { info: message });
  }
}
