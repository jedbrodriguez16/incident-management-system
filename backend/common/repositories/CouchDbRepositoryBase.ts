import { injectable } from "inversify";
import RepositoryBase from "./RepositoryBase";
import * as nano from "nano";
import { plainToClass } from "class-transformer";
import * as _ from "underscore";

export class ViewQuery {
  constructor(
    public docName?: string,
    public indexName?: string,
    public sort: ViewSortingEnum = ViewSortingEnum.asc,
    public key?: string | string[]
  ) {}
}

export enum ViewSortingEnum {
  asc,
  desc,
}

//todo: inject nano
const n = nano("http://admin:admin@localhost:5984");
const db = n.db.use("incidents");

@injectable()
export abstract class CouchDbRepositoryBase extends RepositoryBase {
  protected async findAll(query: ViewQuery): Promise<any[]> {
    return db
      .view(query.docName, query.indexName, this._buildParams(query))
      .then((res) => {
        return res.rows.map((row) => {
          let doc = row.doc;
          delete doc._id;
          delete doc._rev;

          let model = plainToClass(this.getModelClass(), {
            id: row.id,
            ...doc,
          });

          return model;
        });
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  protected async findOne(id: string): Promise<any> {
    return db
      .get(id)
      .then((row: any) => {
        row.id = row._id;
        // row.rev = row._rev;
        delete row._id;
        delete row._rev;

        let model = plainToClass(this.getModelClass(), {
          id: row._id,
          ...row,
        });

        return model;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  private _buildParams(query: ViewQuery): any {
    let params: any = {};
    if (_.isArray(query.key)) {
      params.keys = query.key;
    } else if (query.key) {
      params.key = query.key;
    }

    params.include_docs = true;
    params.descending = query.sort === ViewSortingEnum.asc ? false : true;

    return params;
  }
}
