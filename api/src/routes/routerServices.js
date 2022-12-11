const { Router } = require("express");
const routerServices = Router();
const apiData = require("../../hotels.json");

routerServices.get("/", async (req, res) => {
  const servicesRepeat = apiData
    .map((data) => data.services)
    .join()
    .split(",");
  // console.log(servicesRepeat)
  const servicesNoRepeat = [...new Set(servicesRepeat)];

  res.send(servicesNoRepeat);
});

module.exports = routerServices;
