import Express from "express";
import controller from "./controller";
//import authorizationController from "../../authorization/controller";
// import awsUpload from "../../../../../helper/awsUploadHandler";
// import uploadHandler from "../../../../../helper/uploadHandler";
import uploadHandler from "../../../../helper/uploadHandler";

export default Express.Router()
  //Permission_Modules
  .post("/", controller.createNewLead)
  .get("/users", controller.getUsers)
  .post("/personaldetails", controller.personalDetails)
  .post("/employmentdetails", controller.employmentDetails)
  .put("/generateotp", controller.generateOTP)
  .put("/verifyotp", controller.verifyOTP)
  .get("/personaldetails/:user_id", controller.getPersonalDetails)
  .get("/employmentdetails/:user_id", controller.getEmploymentdetails)
  .post("/uploaddocuments", uploadHandler.uploadFile, controller.uploadDocuments)
  .get("/uploadeddocuments/:user_id/:lead_id", controller.getUploadedDocuments)
  .put("/updateuploaddocuments", uploadHandler.uploadFile, controller.updateUploadedDocuments)
  .get("/alllist", controller.getAllList)
