const express = require("express");
const controllerBasic = require("../controllers/controllerBasics");
const router = express.Router();

router.route("/").get(controllerBasic.getHome);
router.route("/welcome").post(controllerBasic.getWelcome);
router.route("/ticket").post(controllerBasic.getTicket);
router.route("/events").get(controllerBasic.getEvents);
router.route("/event").post(controllerBasic.getEvent);
router.route("/registration").get(controllerBasic.getRegistration);
router.route("/login").post(controllerBasic.getLogin);
router.route("/under-construction").get(controllerBasic.getConstruction);
// 
router.route("/personal").post(controllerBasic.getPersonal);
// 
router.route("/logEvent").get(controllerBasic.getPersonalLog);

module.exports = router;