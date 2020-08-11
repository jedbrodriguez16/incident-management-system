import { injectable, inject } from "inversify";
import RepositoryBase from "../RepositoryBase";
import { ServerScope } from "nano";
import * as _ from "underscore";
import types from "../types";
import commonTypes from "../../services/types";
import IReflectionService from "../../services/IReflectionService";
import { MetaDataEnum } from "../../enum/MetaDataEnum";
import { RepositoryException } from "../exception/RepositoryException";

export class ViewQuery {
  constructor(
    public docName?: string,
    public indexName?: string,
    public sort: ViewSortingEnum = ViewSortingEnum.Ascending,
    public key?: string | string[]
  ) {}
}

export enum ViewSortingEnum {
  Ascending,
  Descending,
}

@injectable()
export abstract class CouchDbRepositoryBase extends RepositoryBase {
  @inject(types.nanoCouchDb)
  private readonly _db: ServerScope;

  @inject(commonTypes.IReflectionService)
  protected _reflectionService: IReflectionService;

  protected async findAll(query: ViewQuery): Promise<any[]> {
    try {
      const db = this._getDbContext();
      const res: any = await db.view(
        query.docName,
        query.indexName,
        this._buildParams(query)
      );
      return res.rows.map((row) => {
        let doc = row.doc;
        delete doc._id;
        delete doc._rev;
        return this.toModel({
          id: row.id,
          ...doc,
        });
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  protected async findOne(query: ViewQuery): Promise<any> {
    const models = await this.findAll(query);
    if (models && models.length > 0) {
      return models[0];
    }
  }

  protected async findById(id: string): Promise<any> {
    try {
      const db = this._getDbContext();
      const row: any = await db.get(id);
      row.id = row._id;
      row.rev = row._rev;
      delete row._id;
      delete row._rev;
      return this.toModel({
        id: row._id,
        ...row,
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  protected save(model: any): Promise<any> {
    const id = model.id;
    if (id) {
      model._id = id;
      model._rev = model.rev;
      delete model.id;
      delete model.rev;
    }
    const db = this._getDbContext();
    return db
      .insert(model, id)
      .then((res) => {
        model.id = res.id;
        model.rev = res.rev;
        delete model._id;
        delete model._rev;
        return model;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  protected remove(id: string, rev: string): Promise<any> {
    const db = this._getDbContext();
    return db
      .destroy(id, rev)
      .then((res) => {
        return {
          id: res.id,
          rev: res.rev,
        };
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
    params.descending = query.sort === ViewSortingEnum.Ascending ? false : true;

    return params;
  }

  private _getDbContext() {
    let klass: any = this.getModelClass();
    if (klass !== undefined && klass !== null) {
      const dbName: string = this._reflectionService.getMetaData(
        klass,
        MetaDataEnum.DbInfo
      );
      if (dbName !== undefined && dbName !== null) {
        return this._db.db.use(dbName);
      } else {
        throw new RepositoryException(
          "model class is not annotated with @DbInfo"
        );
      }
    } else {
      throw new RepositoryException(
        "Database operation needed a valid model class parameter"
      );
    }
  }
}
