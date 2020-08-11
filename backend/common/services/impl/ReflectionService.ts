import IReflectionService from "../IReflectionService";
import { injectable } from "inversify";
import { MetaDataEnum } from "../../enum/MetaDataEnum";

@injectable()
export default class ReflectionService implements IReflectionService {
  getMetaData(
    targetClass: any,
    annotationName: MetaDataEnum,
    annotatedProperty?: string | symbol
  ): any {
    if (annotatedProperty) {
      return Reflect.getMetadata(
        annotationName,
        targetClass,
        annotatedProperty
      );
    } else {
      return Reflect.getMetadata(annotationName, targetClass);
    }
  }
}
