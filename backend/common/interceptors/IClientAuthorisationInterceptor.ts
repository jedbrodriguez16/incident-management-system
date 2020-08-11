import * as express from "express";

export default interface IClientAuthorisationInterceptor {
  invoke(
    resource: string,
    action: string,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any>;
}
