const { Payment, MercadoPagoConfig } = require("mercadopago");
async function sendResponse(req, res) {
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

  const dataID = req.query["data.id"];
  try {
    const client = new MercadoPagoConfig({
      accessToken: ACCESS_TOKEN,
      options: { timeout: 5000 },
    });

    const payment = new Payment(client);

    const response = await payment.get({
      id: dataID,
    });

    const data = {
      idExternal: response.external_reference,
      status: response.status,
      paymentType: response.payment_type_id,
      statusDatails: response.status_detail,
      serviceName: response.description,
      value: response.transaction_amount,
      dateAproved: response.date_approved,
      dateCreated: response.date_created,
    };

    console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendResponse;
