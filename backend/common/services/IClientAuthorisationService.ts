export default interface IClientAuthorisationService {
  isAuthorized(
    resource: string,
    action: string,
    token: string
  ): Promise<boolean>;
}
