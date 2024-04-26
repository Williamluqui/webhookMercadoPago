const express = require("express");

const middleware = require("../middleware/middleware");
const processWebhook = require("../controller/hook.controller");
const hello = require("../controller/hello.controller");

const router = express.Router();

router.post("/notifications", middleware, processWebhook);

router.post("/send-notifications", hello);

router.get("/metrics");

module.exports = router;
