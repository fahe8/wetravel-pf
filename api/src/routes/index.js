const { Router } = require("express");
const router = Router();
const routerHotels = require("./routerHotels");
const routerUsers = require("./routerUsers");
const routerReserves = require("./routerReserves");
const routerPay = require("./routerPay");
const routerReview = require("./routerReview");
const routerOrder = require("./order");
const routerServices = require("./routerServices");
const routerFavorites = require("./routerFavorites");
const routerImage = require("./routerImage");
<<<<<<< HEAD
const routerMail = require ("../routes/routesMails/confirmacion")
const routerMailCreate = require ("../routes/routesMails/creacion")
=======
const routerMail = require("./mail");
const routerBaned = require("./routerBaned");
>>>>>>> 2291c1dcdcc67d616db3a63d9f212e52a901e7e6

router.use("/mercadopay", routerPay);

router.use("/hotels", routerHotels);

router.use("/users", routerUsers);

router.use("/services", routerServices);

router.use("/order", routerOrder);

router.use("/reserve", routerReserves);

router.use("/review", routerReview);

router.use("/favorites", routerFavorites);

router.use("/images", routerImage);

<<<<<<< HEAD
router.use("/send-email", routerMail)

router.use("/send-email-create", routerMailCreate)


=======
router.use("/send-email", routerMail);
>>>>>>> 2291c1dcdcc67d616db3a63d9f212e52a901e7e6

router.use("/baned", routerBaned);

module.exports = router;
