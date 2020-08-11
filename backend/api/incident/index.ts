import "reflect-metadata";
import * as express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";

import iocContainer from "./iocContainer";
import configureServices from "./services/ioc";
import configureRepositories from "./repositories/ioc";
import configureCommonServices from "../../common/services/ioc";
import configureCommonInterceptors from "../../common/interceptors/ioc";
import configureCommonRepositories from "../../common/repositories/ioc";
import commonTypes from "../../common/services/types";
import IErrorHandlerService from "../../common/services/IErrorHandlerService";

//configure iocContainer
configureCommonServices(iocContainer);
configureCommonInterceptors(iocContainer);
configureCommonRepositories(iocContainer);
configureServices(iocContainer);
configureRepositories(iocContainer);

// load controllers
import "./controllers/IncidentController";

const app: express.Application = express();
// @ts-ignore
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin, Authorization"
  );
  next();
});
let server = new InversifyExpressServer(iocContainer, app);
server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());
});
let errorHandlerService = iocContainer.get<IErrorHandlerService>(
  commonTypes.IErrorHandlerService
);
server.setErrorConfig((app) => {
  app.use(errorHandlerService.handle.bind(errorHandlerService));
});

let serverInstance = server.build();
serverInstance.listen(8080);

console.log("Incident Web API started on port 8080...");
