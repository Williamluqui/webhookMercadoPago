const express = require("express");
const startMetricsServer = require("../controller/metrics");
const middleware = require("../middleware/middleware");
const WebhookController = require("../controller/hook.controller");
const sendDatas = require("../utils/sendData");
const webhookKey = require("../middleware/hookKey");

const webhookController = new WebhookController();

const router = express.Router();

router.post("/notifications", middleware, webhookController.processWebhook);

router.post("/send-notifications", webhookKey, sendDatas);

router.get("/metrics", startMetricsServer);

module.exports = router;
