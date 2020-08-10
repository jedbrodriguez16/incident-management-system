import AuthenticationResultDto from "./dto/AuthenticationResultDto";
import AuthenticationDto from "./dto/AuthenticationDto";

export default interface IAuthenticationService {
  login(credential: AuthenticationDto): Promise<AuthenticationResultDto>;
}
