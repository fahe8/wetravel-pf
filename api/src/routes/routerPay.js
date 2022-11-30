require("dotenv").config();
const { Router } = require("express");
const routerPay = Router();
const { ACCESS_TOKEN } = process.env;
const mercadopago = require("mercadopago");
// Agrega credenciales

mercadopago.configure({
  access_token: `${ACCESS_TOKEN}`,
});

routerPay.post("/", async (req, res) => {
  const { title, id, unit_price, quantity } = req.body;
  let preference = {
    items: [
      {
        id: id,
        title: title,
        unit_price: unit_price,
        quantity: quantity,
      },
    ],
  };
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.send(response.body.init_point);
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = routerPay;
