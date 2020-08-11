import * as express from "express";
import HttpMethodEnum from "../enum/HttpMethodEnum";

export interface IHttpServiceRequest {
  url: string;
  method?: HttpMethodEnum;
  header?: any;
  data?: any;
  formData?: any;
}

export default interface IHttpService {
  getBearerToken(req: express.Request): string;
  get(httpRequest: IHttpServiceRequest): Promise<any>;
  post(httpRequest: IHttpServiceRequest): Promise<any>;
  invoke(httpRequest: IHttpServiceRequest): Promise<any>;
}
