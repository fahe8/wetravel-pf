const { Router } = require("express");
const router = Router();
const routerHotels = require("./routerHotels");
const routerUsers = require('./routerUsers');
const routerReserves = require('./routerReserves');
const routerPay = require("./routerPay")



router.use("/mercadopay", routerPay);

router.use("/hotels", routerHotels);

router.use('/users', routerUsers);

// router.use('/services', routerServices);

router.use("/reserve",routerReserves)

module.exports = router;
