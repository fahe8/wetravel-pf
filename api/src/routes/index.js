const { Router } = require("express");
const router = Router();
const routerHotels = require("./routerHotels");
const routerUsers = require('./routerUsers');

router.use("/hotels", routerHotels);

router.use('/users', routerUsers);

module.exports = router;
