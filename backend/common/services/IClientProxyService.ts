import HttpMethodEnum from "../enum/HttpMethodEnum";

export class ClientProxyServiceRequest {
  method?: HttpMethodEnum;
  url: string;
  token: string;
  payload?: any;
  formData?: any;
}

export class ClientProxyServiceReponse {
  status: number;
  payload: any;
}

export default interface IClientProxyService {
  invoke(
    request: ClientProxyServiceRequest
  ): Promise<ClientProxyServiceReponse>;
}
