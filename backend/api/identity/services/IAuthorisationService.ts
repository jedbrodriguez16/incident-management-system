export default interface IAuthorisationService {
  isAllowed(
    resource: string,
    action: string,
    groups: string[]
  ): Promise<boolean>;
}
