import { Container } from "inversify";
import * as Nano from "nano";
import commonRepoTypes from "./types";
import commonServiceTypes from "../services/types";
import IConfigService from "../services/IConfigService";

export default function configureCommonRepositories(container: Container) {
  const configService: IConfigService = container.get<IConfigService>(
    commonServiceTypes.IConfigService
  );
  const host = configService.getValue("database.host");
  const db = Nano(host);
  container.bind<any>(commonRepoTypes.nanoCouchDb).toConstantValue(db);
  // cannot be here since common should not know where is the database
  //todo: read from config file
  // let n = Nano("http://admin:admin@localhost:5984");
  // let db = n.db.use("incidents");

  // container.bind<any>(types.nanoCouchDb).toConstantValue(db);
  return container;
}
