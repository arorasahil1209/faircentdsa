let Config = require('../config/')

import Config from "config";
import Routes from "./routes";
import Server from "./common/server";

const dbUrl = `${Config.get("databaseHost")}`;
const server = new Server()
  .router(Routes)
  //.configureSwagger(Config.get("swaggerDefinition"))
  //.configureUI()
  .handleError()
  .configureDb(dbUrl)
  .then((_server) => _server.listen(Config.get("port")));

export default server;
