import { injectable } from "inversify";
import { plainToClass } from "class-transformer";
import * as _ from "underscore";

@injectable()
export default abstract class ServiceBase {
  abstract getDtoClass(): any;

  protected toDto(model: any): any {
    if (_.isArray(model)) {
      return model.map((model) => {
        return plainToClass(this.getDtoClass(), model);
      });
    } else {
      return plainToClass(this.getDtoClass(), model);
    }
  }
}
