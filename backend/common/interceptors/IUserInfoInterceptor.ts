import * as express from "express";

export default interface IUserInfoInterceptor {
  invoke(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any>;
}
