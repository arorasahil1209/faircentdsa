// import Express from "express";
// import Mongoose from "mongoose";
// import * as bodyParser from "body-parser";
// import * as http from "http";
// import * as path from "path";
// import cors from "cors";
// import helmet from "helmet";
// import swaggerUi from "swagger-ui-express";
// import swaggerJSDoc from "swagger-jsdoc";
// import useragent from "express-useragent";
// import Config from "config";
// import logger from "../helper/logger";
// import uncaughtExceptions from "../helper/uncaughtExceptions";
// import ErrorHandler from "../helper/errorHandler";
// import makeRequest from "request";
// import Boom from "boom";
// const db = require("../models/index");

// const app = new Express();
// const root = path.normalize(`${__dirname}/../..`);
// const images = path.normalize(`${__dirname}/../..`);

// class ExpressServer {
//   constructor() {
//     app.use(bodyParser.json());
//     app.use(
//       bodyParser.urlencoded({
//         extended: true,
//       })
//     );

//     app.use(helmet());
//     app.use(useragent.express());
//     //app.use(Express.static(`${images}/image`));
//    // app.use(Express.static(`${root}/web_panel`));

//     app.use(
//       cors({
//         allowedHeaders: ["Content-Type", "token", "authorization"],
//         exposedHeaders: ["token", "authorization"],
//         origin: "*",
//         methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//         preflightContinue: false,
//       })
//     );
//   }
//   router(routes) {
//     routes(app);
//     return this;
//   }

  // configureSwagger(swaggerDefinition) {
  //   const options = {
  //     // swaggerOptions : { authAction :{JWT :{name:"JWT", schema :{ type:"apiKey", in:"header", name:"Authorization", description:""}, value:"Bearer <JWT>"}}},
  //     swaggerDefinition,
  //     apis: [
  //       path.resolve(`${root}/server/api/v0/controllers/**/*.js`),
  //       path.resolve(`${root}/api.yaml`),
  //     ],
  //   };

  //   console.log("option===>", options);

  //   function requireLogin(request, response, next) {
  //     // console.log('request rec',process.env.swaggerLogin)
  //     if (Date.now() - process.env.swaggerLogin < 15 * 60 * 1000 || true) {
  //       next();
  //     } else {
  //       console.log("else part\n\n");
  //       process.env.swaggerLogin = 0;
  //       response.sendFile(path.resolve(`${root}/views/login.html`));
  //     }
  //   }
  //   app.use(
  //     "/api-docs",
  //     requireLogin,
  //     swaggerUi.serve,
  //     swaggerUi.setup(swaggerJSDoc(options))
  //   );
  //   return this;
  // }
  // configureUI() {
  //   app.get('/files', function (req, res) {
  //     let query = req.query.image
  //     res.sendFile(path.join(images, 'public', query));
  //   });
  //   // app.get('/*', function (req, res) {
  //   //   res.sendFile(path.join(root, 'web_panel', 'index.html'));
  //   // });
  //   return this;
  // }
  // handleError() {
  //   const errorHandler = new ErrorHandler({
  //     logger,
  //     shouldLog: true,
  //   });
  //   app.use(errorHandler.build());
  //   app.use(errorHandler.unhandledRequest());

  //   return this;
  // }
  // configureDb(dbUrl) {
  //   return new Promise((resolve, reject) => {
  //     db.sequelize.sync()
  //     .then(() => {
  //       console.log("Synced db.");
  //       return resolve(this);
  //     })
  //     .catch((err) => {
  //       console.log("Failed to sync db: " + err.message);
  //       return reject(err);
  //     });
  //   })
  // }

  // listen(port) {
  //   http.createServer(app).listen(port, () => {
  //     console.log(`secure app is listening @port ${port}`);
  //     logger.info(`secure app is listening @port ${port}`);
  //   });
  //   return app;
  // }
}

export default ExpressServer;
