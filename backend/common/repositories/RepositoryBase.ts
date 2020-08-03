import { injectable } from "inversify";

@injectable()
export default abstract class RepositoryBase {
  abstract getModelClass(): any;
}
