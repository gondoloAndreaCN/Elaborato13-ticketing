const express = require("express");
const controllerBasic = require("../controllers/controllerBasics");
const router = express.Router();

router.route("/").get(controllerBasic.getHome);
router.route("/registration").get(controllerBasic.getRegistration);
// router.route("/email-reg").post(controllerBasic.sendEmailReg);
router.route("/welcome").post(controllerBasic.getWelcome);
router.route("/under-construction").get(controllerBasic.getConstruction);

module.exports = router;