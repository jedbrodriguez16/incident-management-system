import { Container } from "inversify";
import IIncidentRepository from "./IIncidentRepository";
import IncidentRepository from "./impl/IncidentRepository";
import types from "./types";

export default function configureRepositories(container: Container) {
  container
    .bind<IIncidentRepository>(types.IIncidentRepository)
    .to(IncidentRepository)
    .inSingletonScope();
  return container;
}
