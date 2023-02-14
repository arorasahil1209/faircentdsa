let express = require("express");
let router = express.Router();
let {createPermission ,fetchPermissions,updatePermissions} = require("../controllers/permissionManagementController");

router.post("/permission", createPermission);
router.get("/permissions", fetchPermissions);
router.put("/permissions", updatePermissions);


module.exports = router;