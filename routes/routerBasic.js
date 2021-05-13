const express = require("express");
const controllerBasic = require("../controllers/controllerBasics");
const router = express.Router();

router.route("/").get(controllerBasic.getHome);
router.route("/welcome").post(controllerBasic.getWelcome);
router.route("/events").get(controllerBasic.getEvents);
router.route("/registration").get(controllerBasic.getRegistration);
router.route("/under-construction").get(controllerBasic.getConstruction);

module.exports = router;