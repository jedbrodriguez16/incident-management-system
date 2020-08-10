export default interface IUtilService {
  toJson(value: any): any;
  toObject(value: any): any;
  isHttpAddress(address: string): boolean;
  createHash(data: any, algorithm: string): string;
  getTablename(modelClass: any): string;
  decodeBase64(value: string): string;
  clone(obj): any;
  createObject(klass: any);
  createObjectFrom(klass: any, objectSource: any): any;
}
