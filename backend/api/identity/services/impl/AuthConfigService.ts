import { injectable, inject } from "inversify";

import types from "../../../../common/services/types";
import IAuthConfigService from "../IAuthConfigService";
import IConfigService from "../../../../common/services/IConfigService";
import IUtilService from "../../../../common/services/IUtilService";
import JwtConfigDto from "../dto/JwtConfigDto";

@injectable()
export default class AuthConfigService implements IAuthConfigService {
  @inject(types.IConfigService)
  private readonly _configService: IConfigService;

  @inject(types.IUtilService)
  private readonly _utilService: IUtilService;

  jwt(): JwtConfigDto {
    const privateKey = this._utilService.decodeBase64(
      this._configService.getValue("jwt.key.private")
    );
    const publicKey = this._utilService.decodeBase64(
      this._configService.getValue("jwt.key.public")
    );
    const config: JwtConfigDto = {
      issuer: this._configService.getValue("jwt.issuer"),
      encryption: this._configService.getValue("jwt.encryption"),
      privatekey: privateKey,
      publickey: publicKey,
      accessTokenTTL: this._configService.getValue("jwt.ttl.accessToken"),
      refreshTokenTTL: this._configService.getValue("jwt.ttl.refreshToken"),
    };
    return config;
  }
}
