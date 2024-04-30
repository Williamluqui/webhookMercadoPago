const crypto = require("crypto");

async function consultValidUrl(req, res, next) {
  const headerSignature = req.headers["x-signature"];
  const xRequestId = req.headers["x-request-id"];
  const dataQuery = req.query;

  const SECRET_SIGNATURE = process.env.SECRET_SIGNATURE;

  if (!SECRET_SIGNATURE)
    return res
      .status(401)
      .json({ error: "Senha do webhook (Assinatura secreta) não encontrada !" });

  try {
    const idQuery = dataQuery["data.id"] ? dataQuery["data.id"] : dataQuery["id"];

    if (!idQuery)
      return res
        .status(401)
        .json({ error: "Não foram encontradas informações vindas da url! " });

    if (!headerSignature || !xRequestId)
      throw new Error("Cabeçalho inválido ou faltando !");

    const splitSignature = headerSignature.split(",");

    const [time, code] = splitSignature;

    const signature = code.replace("v1=", "");
    const timestamp = Number(time.replace("ts=", ""));

    const manifest = `id:${idQuery};request-id:${xRequestId};ts:${timestamp};`;
    const cyphedSignature = crypto
      .createHmac("sha256", SECRET_SIGNATURE)
      .update(manifest)
      .digest("hex");

    if (cyphedSignature !== signature) {
      throw new Error("HMAC verification failed");
    }
    next();
  } catch (error) {
    console.log(`[ERRO] ${error}`);
    res.status(401).json({
      message: "A verificação falhou ",
      error: error.message,
    });
  }
}
module.exports = consultValidUrl;
