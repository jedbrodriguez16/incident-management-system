export default interface IErrorHandlerService {
  handle(error: any, req: any, res: any, next: any);
}
