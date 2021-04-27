const express = require("express");
const controllerBasic = require("../controllers/controllerBasics");
const router = express.Router();

router.route("/").get(controllerBasic.getHome);
router.route("/registration").get(controllerBasic.getRegistration);
router.route("/email").post(controllerBasic.sendEmail);

module.exports = router;