import JwtConfigDto from "./dto/JwtConfigDto";

export default interface IAuthConfigService {
  jwt(): JwtConfigDto;
}
