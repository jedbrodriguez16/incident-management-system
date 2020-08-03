import { Container } from "inversify";
import IIncidentService from "./IIncidentService";
import IncidentService from "./impl/IncidentService";
import types from "./types";

export default function configureServices(container: Container) {
  container
    .bind<IIncidentService>(types.IIncidentService)
    .to(IncidentService)
    .inSingletonScope();
  return container;
}
