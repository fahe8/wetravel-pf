const { Router } = require("express");
const router = Router();
const routerHotels = require("./routerHotels");
<<<<<<< HEAD
const routerUsers = require("./routerUsers");
const routerReserves = require("./routerReserves");
const routerPay = require("./routerPay");
const routerReview = require("./routerReview");
=======
const routerUsers = require('./routerUsers');
const routerReserves = require('./routerReserves');
const routerPay = require("./routerPay")
const order = require("./order")


>>>>>>> b53711103ef371bfa84a5d4d0854c8ce5925ffdb

router.use("/mercadopay", routerPay);

router.use("/hotels", routerHotels);

router.use("/users", routerUsers);

// router.use('/services', routerServices);

<<<<<<< HEAD
router.use("/reserve", routerReserves);

router.use("/review", routerReview);
=======
router.use("/reserve",routerReserves)
router.use("/order",order)
>>>>>>> b53711103ef371bfa84a5d4d0854c8ce5925ffdb

module.exports = router;
