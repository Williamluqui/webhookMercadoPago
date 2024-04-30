const client = require("prom-client");
async function startMetricsServer(req, res) {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics();

  res.set("Content-Type", client.register.contentType);

  return res.send(await client.register.metrics());
}
module.exports = startMetricsServer;
