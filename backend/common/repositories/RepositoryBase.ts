import { injectable } from "inversify";
import { plainToClass } from 'class-transformer';

@injectable()
export default abstract class RepositoryBase {
  abstract getModelClass(): any;

  protected toModel(source: any) {
    return plainToClass(this.getModelClass(), source);
}
}
