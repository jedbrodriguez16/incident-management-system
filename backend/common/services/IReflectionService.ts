import { MetaDataEnum } from "../enum/MetaDataEnum";

export default interface IReflectionService {
  getMetaData(target: any, key: MetaDataEnum, property?: string | symbol): any;
}
