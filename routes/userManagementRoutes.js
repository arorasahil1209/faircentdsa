let express = require("express");
let router = express.Router();
let { createUser,listUser,userById,updateUser} = require("../controllers/userManagementController");

router.post("/create-user", createUser);
router.get("/list-user", listUser);
router.get("/user-detail", userById);
router.put("/user-detail", updateUser);


module.exports = router;