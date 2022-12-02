const { User, Hotel } = require("../db");
const { Router } = require("express");
const routerReview = Router();

routerReview.get("/", async (req, res) => {
  try {
    const dataDb = await Hotel.findAll({
      includes: {
        model: User,
        as: "user",
        attributes: ["name"],
      },
      attributes: ["id", "stars", "comments"],
    });
    dataDb.length ? res.send(dataDb) : res.status(400).send("no se encuentra");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = routerReview;
