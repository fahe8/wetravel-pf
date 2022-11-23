const { Router } = require("express");
const router = Router();
const routerHotels = require("./routerHotels");

router.use("/hotels", routerHotels);

module.exports = router;
