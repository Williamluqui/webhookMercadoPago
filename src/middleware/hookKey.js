const { HOOK_KEY } = process.env;

const authenticateApiKey = (req, res, next) => {
  const hookKey = req.headers["hook-key"];

  if (hookKey && hookKey === HOOK_KEY) {
    next();
  } else {
    return res.status(403).json({ error: "Chave do Webhook inválida" });
  }
};

const loggingMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
module.exports = authenticateApiKey;
