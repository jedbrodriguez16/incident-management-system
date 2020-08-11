import { injectable } from "inversify";
import * as async from "async";
import * as os from "os";
import IFlowService, { ItemHandler } from "../IFlowService";

@injectable()
export default class FlowService implements IFlowService {
  private _parallelCount: number;

  async each<TData>(
    items: TData[],
    handler: ItemHandler,
    parallelCount?: number
  ): Promise<any> {
    parallelCount = parallelCount || this._getDefaultParallelCount();
    return new Promise((resolve, reject) => {
      const results = [];
      // @ts-ignore
      async.eachOfLimit(
        items,
        parallelCount,
        (item, index, callback) => {
          handler(item)
            .then((response) => {
              results[index] = response;
              callback();
            })
            .catch((err) => {
              callback(err);
            });
        },
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  private _getDefaultParallelCount(): number {
    if (this._parallelCount === undefined) {
      this._parallelCount = os.cpus().length;
    }
    return this._parallelCount;
  }
}
