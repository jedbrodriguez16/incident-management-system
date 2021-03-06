import { injectable, inject } from "inversify";
import IUtilService from "../IUtilService";
import IConfigService from "../IConfigService";
import ILogService from "../ILogService";
import commonServiceTypes from "../types";

@injectable()
export default abstract class BaseService {
  @inject(commonServiceTypes.IConfigService)
  protected _configService: IConfigService;

  @inject(commonServiceTypes.IUtilService)
  protected _utilService: IUtilService;

  @inject(commonServiceTypes.ILogService)
  protected _logService: ILogService;

  protected abstract getDtoClass(): Function;

  protected async getRecord(request: Promise<any>) {
    let model = await request;
    return this.toDto(model);
  }

  protected async getRecords(request: Promise<any[]>) {
    let records: any[] = [];
    let models = await request;
    if (models && models.length) {
      records = models.map((model) => {
        return this.toDto(model);
      });
    }
    return records;
  }

  protected toDto(dataModel: any): any {
    return this._utilService.createObjectFrom(this.getDtoClass(), dataModel);
  }

  protected toDbModel(dataModelClass: Function, dto: any): any {
    return this._utilService.createObjectFrom(dataModelClass, dto);
  }

  protected createKey(...keys: string[]): string {
    let className = this.getDtoClass().name.toLowerCase();
    return [className, keys.join(":")].join(":");
  }
}
