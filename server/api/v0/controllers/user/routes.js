import Express from "express";
import controller from "./controller";
//import authorizationController from "../../authorization/controller";
// import awsUpload from "../../../../../helper/awsUploadHandler";
// import uploadHandler from "../../../../../helper/uploadHandler";
import uploadHandler from "../../../../helper/uploadHandler";

export default Express.Router()
  //Permission_Modules
  .post("/addnewuser", uploadHandler.uploadFile, controller.addNewUser)
  .put("/edit/:id", uploadHandler.uploadFile, controller.editUser)
  .put("/forgotpassword/:email", controller.forgotPassword)
  .put("/resetpassword/:id?", controller.resetPassword)
  .get("/userlist", uploadHandler.uploadFile, controller.userList)
  .post("/adddsapartner", uploadHandler.uploadFile, controller.addNewDsaPartner)
  .put("/editdsapartner/:id", uploadHandler.uploadFile, controller.editDsaPartner)
  .get("/dsapartnerlist", uploadHandler.uploadFile, controller.dsaPartnerList)
  .post("/userlogin", controller.userLogin)