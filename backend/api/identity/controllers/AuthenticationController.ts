import {
  controller,
  httpPost
} from "inversify-express-utils";

@controller("/auth")
export class AuthenticationController {

  @httpPost("/login")
  public login() {
    // 
  }

}
