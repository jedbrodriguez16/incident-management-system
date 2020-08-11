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

  return container;
}
