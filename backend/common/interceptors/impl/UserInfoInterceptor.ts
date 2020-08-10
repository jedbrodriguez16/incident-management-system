import { injectable, inject } from "inversify";
import * as express from "express";
import IUserInfoInterceptor from "../IUserInfoInterceptor";
import commonServiceTypes from "../../services/types";
import IUserInfoService from "../../services/IUserInfoService";

@injectable()
export default class UserInfoInterceptor implements IUserInfoInterceptor {
  @inject(commonServiceTypes.IUserInfoService)
  private _userInfoService: IUserInfoService;

  async invoke(
    request: express.Request,
    // @ts-ignore
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    let req: any = request;
    let headers = req.headers || {};
    let authorisation = headers.authorization || "Bearer ";
    let token = authorisation.split(" ")[1];
    let user = await this._userInfoService.getByToken(token);
    req.userInfo = user;
    next();
  }
}
