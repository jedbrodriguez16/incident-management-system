import { Container } from "inversify";
import types from "./types";
import * as Nano from "nano";

export default function configureCommonRepositories(container: Container) {
  //todo: read from config file
  let n = Nano("http://admin:admin@localhost:5984");
  let db = n.db.use("incidents");

  container.bind<any>(types.nanoCouchDb).toConstantValue(db);
  return container;
}
