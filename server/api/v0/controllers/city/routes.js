import Express from "express";
import controller from "./controller";
//import authorizationController from "../../authorization/controller";
// import awsUpload from "../../../../../helper/awsUploadHandler";
// import uploadHandler from "../../../../../helper/uploadHandler";

export default Express.Router()
  //City
  .post("/add", controller.addCity)
  .put("/edit/:id", controller.editCity)
  .put("/active/:id", controller.activeCity)
  .put("/inactive/:id", controller.inactiveCity)
  .get("/list", controller.listCity)
  .get("/:id", controller.detailsCity)
