import JwtTokenDto from "./dto/JwtTokenDto";
import AuthenticationDto from "./dto/AuthenticationDto";
import JwtCreateTokenDto from "./dto/JwtCreateTokenDto";

export default interface IJwtService {
  login(credential: AuthenticationDto): Promise<JwtTokenDto>;
  createToken(createTokenDto: JwtCreateTokenDto): Promise<string>;
  decrypt(token: string): Promise<any>;
}
