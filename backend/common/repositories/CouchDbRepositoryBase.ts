import { injectable } from "inversify";
import RepositoryBase from "./RepositoryBase";
import * as nano from "nano";
import { plainToClass } from "class-transformer";
import * as _ from "underscore";

export class ViewQuery {
  constructor(
    public designName: string,
    public viewName: string,
    public key?: string | string[]
  ) {}
}

//todo: inject nano
const n = nano("http://admin:admin@localhost:5984");
const db = n.db.use("incidents");

@injectable()
export abstract class CouchDbRepositoryBase extends RepositoryBase {
  protected async findAll(query: ViewQuery): Promise<any[]> {
    return db
      .view(query.designName, query.viewName, this._buildParams(query))
      .then((res) => {
        return res.rows.map((row) => {
          let doc = row.doc;
          delete doc._id;
          delete doc._rev;

          let incidentModel = plainToClass(this.getModelClass(), {
            id: row.id,
            ...doc,
          });

          return incidentModel;
        });
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  private _buildParams(query): any {
    let params: any = {};
    if (_.isArray(query.key)) {
      params.keys = query.key;
    } else if (query.key) {
      params.key = query.key;
    }

    params.include_docs = true;

    return params;
  }
}
