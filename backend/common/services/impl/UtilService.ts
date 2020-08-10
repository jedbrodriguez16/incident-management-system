import { inject, injectable } from "inversify";
import * as _ from "underscore";
import types from "../types";
import IUtilService from "../IUtilService";
import { CommonConstant } from "../../enum/CommonConstant";
import FieldMap from "../FieldMap";

@injectable()
export default class UtilService implements IUtilService {
  private _decodedValue: any = {};

  @inject(types.CryptoLib)
  private readonly _crypto;

  toJson(value: any): any {
    let converted: any = value;
    if (value && typeof value === "object") {
      converted = JSON.stringify(value);
    }
    return converted;
  }

  toObject(value: any): any {
    let converted: any = value;
    if (_.isString(value) && value.length > 0) {
      try {
        converted = JSON.parse(value);
      } catch (err) {
        converted = {};
      }
    }
    return converted;
  }

  isHttpAddress(address: string): boolean {
    let isHttp = false;
    if (_.isString(address) && address.length > 0) {
      isHttp =
        address.indexOf("http://") === 0 || address.indexOf("https://") === 0;
    }
    return isHttp;
  }

  createHash(data: any, algorithm: string = "md5"): string {
    const json = this.toJson(data);
    return this._crypto.createHash(algorithm).update(json).digest("hex");
  }

  getTablename(modelClass: any): string {
    return Reflect.getMetadata(CommonConstant.TableName, modelClass);
  }

  decodeBase64(value: string): string {
    let decodedValue: string;
    if (value) {
      decodedValue = this._decodedValue[value];
      if (!decodedValue) {
        const buffer = Buffer.from(value, "base64");
        decodedValue = buffer.toString("ascii");
        this._decodedValue[value] = decodedValue;
      }
    }
    return decodedValue;
  }

  clone(obj) {
    return this.toObject(this.toJson(obj));
  }

  createObject(klass: any): any {
    //todo: hookup an afterCreateHandler for mapping
    let object = new klass();
    return object;
  }

  createObjectFrom(klass: any, objectSource: any): any {
    let model: any;
    if (klass && objectSource) {
      model = this.createObject(klass);
      let fields = this.getMapFields(klass);
      if (fields && fields.length > 0) {
        fields.forEach((field) => {
          let fieldName = field.destinationField;
          let dbFieldName = field.sourceField;
          if (fieldName && objectSource[dbFieldName] !== undefined) {
            model[fieldName] = objectSource[dbFieldName];
          }
        });
      }
    }
    return model;
  }

  getMapFields(modelClass: any): FieldMap[] {
    let fields: any[] = [];
    if (
      modelClass &&
      modelClass.$__mapFields !== undefined &&
      modelClass.$__mapFields.length > 0
    ) {
      fields = modelClass.$__mapFields.map((field) => {
        return Object.assign({}, field);
      });
    }
    return fields;
  }
}
