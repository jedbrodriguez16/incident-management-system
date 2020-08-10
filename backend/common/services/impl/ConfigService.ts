import { injectable, inject } from "inversify";
import * as objectPath from "object-path";

import types from "../types";
import IConfigService from "../IConfigService";
import IUtilService from "../IUtilService";

@injectable()
export default class ConfigService implements IConfigService {
  @inject(types.IUtilService)
  private readonly _utilService: IUtilService;

  @inject(types.ConfigLoader)
  private readonly _configLoader: any;

  @inject(types.EnvironmentVariables)
  private readonly _environmentVariables: any;

  private _configValues: any;

  private readonly _cacheValue = {};

  getPublicKey(): string {
    return this._utilService.decodeBase64(this.getValue("jwt.key.public"));
  }

  getAuthorisationEndpoint(): string {
    return this.getValue("services.authorisationEndpoint");
  }

  getDecryptEndpoint(): string {
    return this.getValue("services.decryptionEndpoint");
  }

  getValue(key: string) {
    if (this._cacheValue[key] === undefined) {
      this._cacheValue[key] = objectPath.get(this._configValues, key);
    }
    return this._cacheValue[key];
  }

  // note: anti-pattern
  async load(): Promise<void> {
    this._configValues = {
      ...this._configLoader,
      ...this._environmentVariables,
    };
  }
}
