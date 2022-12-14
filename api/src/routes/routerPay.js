require("dotenv").config();
const { Router } = require("express");
const routerPay = Router();
const { ACCESS_TOKEN } = process.env;
const mercadopago = require("mercadopago");
const { Op } = require("sequelize");
const {Reserves, Order} = require("../db")
// Agrega credenciales
mercadopago.configure({
  access_token: `${ACCESS_TOKEN}`,
});


const reservaciones = async (user) => {   
//   return await Reserves.findAll({
//   where: {userReserve: user},
// })

const reservasbyOrder =  await Order.findOne({
  where: {
      [Op.and]: [
          { user_email:  user }, 
          { status: 'created'} 
      ]
  },
  include: Reserves
})

return reservasbyOrder.reserves

}

routerPay.get("/:user", async (req, res) => {
  const { user } = req.params;
const allreservation = await reservaciones(user)

const id_orden = allreservation[0].orderId 
// const id_orden = 1

//console.log("ESTA ES LA ORDERID",id_orden)
  const items_ml = allreservation.map(i => ({

    title: i.nameHotel,
    quantity:i.quantity,
    unit_price: Number(i.price)
  }))


  let preference = {
    items: items_ml,
    external_reference : `${id_orden}`,
    payment_methods: {
      excluded_payment_types: [
        {
          id: "atm"
        }
      ],
      installments: 3  //Cantidad máximo de cuotas
    },
    back_urls: {
      success: `http://localhost:3001/mercadopay/${user}/pagos`,
      failure: 'http://localhost:3000/carrito',
      pending: 'http://localhost:3001/mercadopago/pagos',
    },
  };

  mercadopago.preferences.create(preference)

  .then(function(response){
    // console.info('respondio')
  //Este valor reemplazará el string"<%= global.id %>" en tu HTML
    global.id = response.body.id;
    // console.log(response.body)
    res.json({ id: global.id });
  })
  .catch(function(error){
    console.log(error);
  })


});

//Ruta que recibe la información del pago
routerPay.get("/:user/pagos", (req, res)=>{
  //console.info("EN LA RUTA PAGOS ", req)
  const payment_id= req.query.payment_id
  const payment_status= req.query.status
  const external_reference = req.query.external_reference
  const merchant_order_id= req.query.merchant_order_id
  //console.log("EXTERNAL REFERENCE ", external_reference)

//Aquí edito el status de mi orden
Order.findByPk(external_reference)
.then((order) => {
  order.payment_id= payment_id
  order.payment_status= payment_status
  order.merchant_order_id = merchant_order_id
  order.status = "completed"
  //console.info('Salvando order')
  order.save()
  .then(() => {
    console.info('redirect success', order)

    return res.redirect(`http://localhost:3000/confirmacion/${external_reference}`)
  })
  .catch((err) =>{
    console.error('error al salvar', err)
    return res.redirect(`http://localhost:3000/?error=${err}&where=al+salvar`)
  })
})
.catch(err =>{
  console.error('error al buscar', err)
  return res.redirect(`http://localhost:3000/?error=${err}&where=al+buscar`)
})

//proceso los datos del pago 
//redirijo de nuevo a react con mensaje de exito, falla o pendiente
})


//Busco información de una orden de pago
routerPay.get("/pagos/:id", (req, res)=>{
  const mp = new mercadopago(ACCESS_TOKEN)
  const id = req.params.id
  //console.info("Buscando el id", id)
  mp.get(`/v1/payments/search`, {'status': 'pending'}) //{"external_reference":id})
  .then(resultado  => {
    //console.info('resultado', resultado)
    res.json({"resultado": resultado})
  })
  .catch(err => {
    console.error('No se consulto:', err)
    res.json({
      error: err
    })
  })
})

module.exports = routerPay;
