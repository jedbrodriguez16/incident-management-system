import { injectable, inject } from "inversify";
import IClientProxyService, {
  ClientProxyServiceRequest,
  ClientProxyServiceReponse,
} from "../IClientProxyService";
import commonServiceTypes from "../types";
import IHttpService from "../IHttpService";
import RpcServiceException from "../exception/RpcServiceException";
import HttpMethodEnum from "../../enum/HttpMethodEnum";

@injectable()
export default class ClientProxyService implements IClientProxyService {
  @inject(commonServiceTypes.IHttpService)
  private _httpService: IHttpService;

  async invoke(
    request: ClientProxyServiceRequest
  ): Promise<ClientProxyServiceReponse> {
    let response: ClientProxyServiceReponse;
    request.method = request.method || HttpMethodEnum.post;
    let url = request.url;
    let header = {
      Authorization: "Bearer " + request.token,
    };
    let httpRequest = {
      url: url,
      header: header,
      data: request.payload,
      formData: request.formData,
    };
    let httpResponse: any;
    if (request.method === HttpMethodEnum.post) {
      httpResponse = await this._httpService.post(httpRequest);
    } else {
      httpResponse = await this._httpService.get(httpRequest);
    }
    response = {
      status: httpResponse.status,
      payload: httpResponse.response,
    };
    if (response.status >= 401) {
      throw new RpcServiceException(response.payload);
    }
    return response;
  }
}
