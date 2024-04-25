const crypto = require("crypto");

async function consultValidUrl(req, res, next) {
  const headerSignature = req.headers["x-signature"];
  const xRequestId = req.headers["x-request-id"];
  const dataID = req.query["data.id"];
  console.log('[X-SIG]',headerSignature)
  console.log('[X-REQ]',xRequestId)
  console.log('[DATAID]',dataID)
  const SECRET_SIGNATURE = process.env.SECRET_SIGNATURE;
  try {
    if (!headerSignature || !xRequestId) throw new Error("Headers malformed !");
    const splitSignature = headerSignature.split(",");

    const [time, code] = splitSignature;

    const signature = code.replace("v1=", "");
    const timestamp = Number(time.replace("ts=", ""));

    const manifest = `id:${dataID};request-id:${xRequestId};ts:${timestamp};`;

    const cyphedSignature = crypto
      .createHmac("sha256", SECRET_SIGNATURE)
      .update(manifest)
      .digest("hex");

    if (cyphedSignature !== signature) {
      console.log("HMAC verification failed");
      res.status(200);
      throw new Error("HMAC verification failed");
    }
    next();
  } catch (error) {
    console.log(`[ERRO] ${error}`);
    res.status(200).json({
      message: "Verification failed " + error,
    });
  }
}
module.exports = consultValidUrl;
