import { inject, injectable } from "inversify";
import { Request } from "express";

import types from "../services/types";
import IUtilService from "../services/IUtilService";

@injectable()
export default abstract class BaseController {
  @inject(types.IUtilService)
  protected _utilService: IUtilService;

  params(httpRequestObject: Request): any {
    let allParams = {};
    if (httpRequestObject) {
      // query params for all methods
      allParams = Object.assign(allParams, httpRequestObject.query || {});

      const httpMethod = httpRequestObject.method.toLowerCase();
      // only put and post is expected to have body
      if (httpMethod === "post" || httpMethod === "put") {
        allParams = Object.assign(allParams, httpRequestObject.body || {});
      }

      // url params for all methods
      allParams = Object.assign(allParams, httpRequestObject.params || {});
    }
    return allParams;
  }
}
