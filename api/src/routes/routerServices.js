const { Service } = require("../db");
const {Router} = require("express");
const routerServices = Router();
const apiData = require("../../hotels.json");


routerServices.get("/", async (req,res) => {

    const allServices = await Service.findAll({attributes:["name"]})
    res.send(allServices)

})

module.exports = routerServices;