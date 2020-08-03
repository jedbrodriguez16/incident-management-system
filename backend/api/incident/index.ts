import "reflect-metadata";
import * as express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";

import iocContainer from "./iocContainer";
import configureServices from "./services/ioc";
import configureRepositories from "./repositories/ioc";

// load controllers
import "./controllers/IncidentController";

//configure iocContainer
configureServices(iocContainer);
configureRepositories(iocContainer);

const app: express.Application = express();
// @ts-ignore
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin"
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

let serverInstance = server.build();
serverInstance.listen(8080);

console.log("Incident Web API started on port 8080...");
