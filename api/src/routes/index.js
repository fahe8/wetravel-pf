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
const routerMail = require("../routes/routesMails/confirmacion");
const routerBaned = require("./routerBaned");
const routerMailCreate = require("../routes/routesMails/creacion");

router.use("/mercadopay", routerPay);

router.use("/hotels", routerHotels);

router.use("/users", routerUsers);

router.use("/services", routerServices);

router.use("/order", routerOrder);

router.use("/reserve", routerReserves);

router.use("/review", routerReview);

router.use("/favorites", routerFavorites);

router.use("/images", routerImage);

router.use("/send-email", routerMail);

router.use("/baned", routerBaned);

router.use("/send-email-create", routerMailCreate)

module.exports = router;
