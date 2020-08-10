import IHttpService, { IHttpServiceRequest } from "../IHttpService";
const request = require("request");
import { injectable } from "inversify";
import * as express from "express";
import HttpMethodEnum from "../../enum/HttpMethodEnum";
import AccessSecurityServiceException from "../exception/AccessSecurityServiceException";
import ServerOveraCapacityException from "../exception/ServerOveraCapacityException";
import RpcServiceException from "../exception/RpcServiceException";

@injectable()
export default class HttpService implements IHttpService {
  getBearerToken(req: express.Request): string {
    let accessToken: string = (req.header("Authorization") || " ").split(
      " "
    )[1];
    return accessToken;
  }

  get(httpRequest: IHttpServiceRequest): Promise<any> {
    httpRequest.method = HttpMethodEnum.get;
    return this.invoke(httpRequest);
  }

  post(httpRequest: IHttpServiceRequest): Promise<any> {
    httpRequest.method = HttpMethodEnum.post;
    return this.invoke(httpRequest);
  }

  invoke(httpRequest: IHttpServiceRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      let requestPayload = {
        url: httpRequest.url,
        headers: undefined,
        method: httpRequest.method || HttpMethodEnum.post,
        json: false,
        form: undefined,
        body: undefined,
        qs: undefined,
      };
      if (httpRequest.formData) {
        requestPayload.json = false;
        requestPayload.form = httpRequest.formData || {};
        requestPayload.headers = Object.assign(
          { "Content-Type": "application/x-www-form-urlencoded" },
          httpRequest.header
        );
      } else {
        if (httpRequest.method === HttpMethodEnum.post) {
          requestPayload.json = true;
          requestPayload.body = httpRequest.data || {};
        } else {
          requestPayload.qs = httpRequest.data || {};
        }
        requestPayload.headers = httpRequest.header;
      }
      request(requestPayload, function (error, response, body) {
        if (error) {
          reject(error);
        } else {
          let status = parseInt(response.statusCode);
          if (status >= 200 && status < 300) {
            resolve({
              status: status,
              headers: response.headers,
              response: body,
            });
          } else if (status === 401) {
            reject(new AccessSecurityServiceException(body));
          } else if (status === 503) {
            reject(new ServerOveraCapacityException("Server over capacity."));
          } else {
            reject(new RpcServiceException(body || "HttpService Server error"));
          }
        }
      });
    });
  }
}
