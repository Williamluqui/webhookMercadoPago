const express = require("express");
const router = express.Router();
const Router = require("express");
const middleware = require("../middleware/middleware");
const sendResponse = require("../controller/hook.controller");

router.post("/notifications", middleware, sendResponse);

router.post("/send-verification");

module.exports = router;
