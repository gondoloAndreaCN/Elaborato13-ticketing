const express = require("express");
const controllerBasic = require("../controllers/controllerBasics");
const router = express.Router();

router.route("/").get(controllerBasic.getHome);
router.route("/welcome").post(controllerBasic.getWelcome);
router.route("/welcomeBack").post(controllerBasic.getWelcomeBack);
router.route("/events").get(controllerBasic.getEvents);
router.route("/event").post(controllerBasic.getEvent);
router.route("/ticket").post(controllerBasic.getTicket);
router.route("/registration").get(controllerBasic.getRegistration);
router.route("/login").get(controllerBasic.getLogin);
router.route("/under-construction").get(controllerBasic.getConstruction);

module.exports = router;