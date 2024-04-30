const { Payment, MercadoPagoConfig, MerchantOrder } = require("mercadopago");
const fns = require("date-fns");
const sendData = require("../utils/sendData");
class WebhookController {
  async processWebhook(req, res, next) {
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

    if (!ACCESS_TOKEN)
      return res.status(401).json({ error: "Access token não encontrado !" });

    const dataQuery = req.query;

    try {
      const dateNow = fns.format(new Date(), "yyyy-MM-dd HH:mm");

      const client = new MercadoPagoConfig({
        accessToken: ACCESS_TOKEN,
        options: { timeout: 5000 },
      });

      const merchantOrders = new MerchantOrder(client);
      const payment = new Payment(client);

      const idPayment = dataQuery["data.id"] ? dataQuery["data.id"] : null;
      const idMerchant = dataQuery["id"] ? dataQuery["id"] : null;

      if (idMerchant) {
        const merchant = await merchantOrders.get({ merchantOrderId: idMerchant });
        const response = {
          id: merchant.id,
          status: merchant.status,
          cancelled: merchant.cancelled,
          referenceId: merchant.external_reference,
        };
        console.log(
          `[${dateNow}]-[MERCHANT]-[ID=${response.id}]-[STATUS=${response.status}]`
        );
        return res.status(200);
      }

      if (!idPayment)
        return res
          .status(400)
          .json({ error: "Não foi encontrado o id de pagamento!" });

      const response = await payment.get({
        id: idPayment,
      });

      const data = {
        id: response.id,
        idExternal: response.external_reference,
        status: response.status,
        paymentType: response.payment_type_id,
        statusDatails: response.status_detail,
        serviceName: response.description,
        value: response.transaction_amount,
        dateAproved: response.date_approved,
        dateCreated: response.date_created,
      };
      console.log(
        `[${dateNow}]-[PAYMENT]-[ID=${data.id}][ID_EXT=${data.idExternal}]-[STATUS=${data.status}]`
      );

      await sendData(data);
      res.status(200).json({ data });
    } catch (err) {
      res.status(400).json({ error: { message: err.message } });
      next();
    }
  }
}

module.exports = WebhookController;
