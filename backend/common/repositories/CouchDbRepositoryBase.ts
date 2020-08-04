import { injectable, inject } from "inversify";
import RepositoryBase from "./RepositoryBase";
import * as Nano from "nano";
import * as _ from "underscore";
import types from './types';

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

@injectable()
export abstract class CouchDbRepositoryBase extends RepositoryBase {

  @inject(types.nanoCouchDb)
  private readonly _db: Nano.DocumentScope<{}>;

  protected findAll(query: ViewQuery): Promise<any[]> {
    return this._db
      .view(query.docName, query.indexName, this._buildParams(query))
      .then((res) => {
        return res.rows.map((row) => {
          let doc = row.doc;
          delete doc._id;
          delete doc._rev;

          return this.toModel({
            id: row.id,
            ...doc,
          });
        });
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  protected findOne(id: string): Promise<any> {
    return this._db
      .get(id)
      .then((row: any) => {
        row.id = row._id;
        row.rev = row._rev;
        delete row._id;
        delete row._rev;

        return this.toModel({
          id: row._id,
          ...row,
        });
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  protected save(model: any): Promise<any> {
    const id = model.id;
    if (id) {
        model._id = id;
        model._rev = model.rev;
        delete model.id;
        delete model.rev;
    }
    return this._db.insert(model, id)
        .then(res => {
            model.id = res.id;
            model.rev = res.rev;
            return model;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
      }

      protected remove(id: string, rev: string): Promise<any> {
        return this._db.destroy(id, rev)
            .then((res) => {
                return {
                    id: res.id,
                    rev: res.rev
                };
            })
            .catch(err => {
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
