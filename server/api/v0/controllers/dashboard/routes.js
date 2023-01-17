import Express from "express";
import controller from "./controller";
//import authorizationController from "../../authorization/controller";
// import awsUpload from "../../../../../helper/awsUploadHandler";
// import uploadHandler from "../../../../../helper/uploadHandler";
import uploadHandler from "../../../../helper/uploadHandler";

export default Express.Router()
  //Application Funnels
  //Business Snapshots
  .get("/applicationfunnel", controller.getApplicationFunnel)
  .get("/businesssnapshots", controller.getBusinessSnapshots)
