const { Router } = require("express");
const router = Router();
const routerHotels = require("./routerHotels");
const routerUsers = require('./routerUsers');
const routerReserves = require('./routerReserves');
const routerPay = require("./routerPay")
const order = require("./order")



router.use("/mercadopay", routerPay);

router.use("/hotels", routerHotels);

router.use('/users', routerUsers);

// router.use('/services', routerServices);

router.use("/reserve",routerReserves)
router.use("/order",order)

module.exports = router;
