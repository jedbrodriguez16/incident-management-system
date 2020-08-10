export default interface IConfigService {
  load();
  getPublicKey(): string;
  getAuthorisationEndpoint(): string;
  getDecryptEndpoint(): string;
  getValue(key: string): string;
}
