import { LogTypeEnum } from "../enum/LogTypeEnum";

export default interface ILogService {
  log(logType: LogTypeEnum, message: any): void;
  info(message: any): void;
  error(message: any): void;
  warning(message: any): void;
}
