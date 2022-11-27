const { Router } = require("express");
const router = Router();
const routerHotels = require("./routerHotels");
const routerUsers = require('./routerUsers');
const routerServices = require('./routerServices');

router.use("/hotels", routerHotels);

router.use('/users', routerUsers);

router.use('/services', routerServices);

module.exports = router;
