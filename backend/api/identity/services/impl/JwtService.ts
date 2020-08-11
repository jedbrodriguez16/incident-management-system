import { injectable, inject } from "inversify";

import IJwtService from "../IJwtService";
import commonTypes from "../../../../common/services/types";
import types from "../types";
import AuthenticationDto from "../dto/AuthenticationDto";
import JwtCreateTokenDto from "../dto/JwtCreateTokenDto";
import JwtTokenDto from "../dto/JwtTokenDto";
import IAuthConfigService from "../IAuthConfigService";
import IAuthenticationService from "../IAuthenticationService";
import AuthenticationResultDto from "../dto/AuthenticationResultDto";
import IDateService from "../../../../common/services/IDateService";
import UnAuthorizedAccessException from "../../../../common/exception/UnAuthorizedAccessException";

@injectable()
export default class JwtService implements IJwtService {
  @inject(types.IAuthConfigService)
  private readonly _authConfigService: IAuthConfigService;

  @inject(types.IAuthenticationService)
  private readonly _authenticationService: IAuthenticationService;

  @inject(commonTypes.IDateService)
  private readonly _dateService: IDateService;

  @inject(types.JwtLib)
  private readonly _jwtLib;

  async login(credential: AuthenticationDto): Promise<JwtTokenDto> {
    const token = new JwtTokenDto();
    if (credential) {
      const jwtConfig = this._authConfigService.jwt();
      const loginResult = await this._authenticationService.login(credential);
      token.accessToken = await this._createAccessToken(
        credential,
        loginResult
      );
      token.refreshToken = await this._createRefreshToken(
        credential,
        loginResult
      );
      token.expiresIn = this._dateService.timespanToSeconds(
        jwtConfig.accessTokenTTL
      );
    }
    return token;
  }

  async createToken(createTokenDto: JwtCreateTokenDto): Promise<string> {
    let token: string;
    if (createTokenDto) {
      const jwtConfig = this._authConfigService.jwt();
      const jwtOptions = {
        issuer: createTokenDto.option.issuer || jwtConfig.issuer,
        subject: createTokenDto.option.subject,
        audience: createTokenDto.option.audience,
        expiresIn: createTokenDto.option.ttl,
        algorithm: jwtConfig.encryption,
      };
      const privateKey = jwtConfig.privatekey;
      token = await this._jwtLib.sign(
        createTokenDto.payload,
        privateKey,
        jwtOptions
      );
    }
    return token;
  }

  async decrypt(token: string): Promise<any> {
    const jwtConfig = this._authConfigService.jwt();
    const publicKey = jwtConfig.publickey;
    try {
      const decryptedValue = await this._jwtLib.verify(token, publicKey);
      return decryptedValue;
    } catch (err) {
      throw new UnAuthorizedAccessException(err.message);
    }
  }

  private async _createAccessToken(
    credential: AuthenticationDto,
    loginResult: AuthenticationResultDto
  ): Promise<string> {
    const jwtConfig = this._authConfigService.jwt();
    const jwtPayload = {
      username: loginResult.username,
      clientId: credential.clientId,
      displayName: loginResult.displayName,
      groups: loginResult.groups,
    };
    const accessToken = await this.createToken({
      payload: jwtPayload,
      option: {
        issuer: jwtConfig.issuer,
        subject: credential.username,
        audience: credential.username,
        ttl: this._dateService.timespanToSeconds(jwtConfig.accessTokenTTL),
      },
    });
    return accessToken;
  }

  private async _createRefreshToken(
    credential: AuthenticationDto,
    loginResult: AuthenticationResultDto
  ): Promise<string> {
    const jwtConfig = this._authConfigService.jwt();
    const jwtPayload = {
      clientId: credential.clientId,
      displayName: loginResult.displayName,
      groups: loginResult.groups,
    };
    const accessToken = await this.createToken({
      payload: jwtPayload,
      option: {
        issuer: jwtConfig.issuer,
        subject: credential.username,
        audience: credential.username,
        ttl: this._dateService.timespanToSeconds(jwtConfig.refreshTokenTTL),
      },
    });
    return accessToken;
  }
}
