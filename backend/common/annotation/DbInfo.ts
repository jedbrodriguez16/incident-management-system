import "reflect-metadata";

import { MetaDataEnum } from "../enum/MetaDataEnum";

export default function DbInfo(dbName: string) {
  return (target: any) => {
    Reflect.defineMetadata(MetaDataEnum.DbInfo, dbName, target);
  };
}
