const { User, Hotel, Review } = require("../db");
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

routerReview.post("/", async (req, res) => {
  let {stars,comments,user} = req.body;
  try {
    let newReview = await Review.create({
      stars,
    comments,
    });

    let userDb = await User.findAll({
      where: { name: user },
    });


    newReview.addUser(userDb);
    res.status(200).send(newReview);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

routerReview.delete('/:id', async (req, res, ) => {
  const { id } = req.params;
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      res.status(404).send("El id de la review no existe en nuestra base de datos");
    } else {
      await review.destroy();
      res.status(200).send ("Review eliminada de nuestra base de datos")
    }
  } catch (error) {
    res.send(error.message)
  }
})


module.exports = routerReview;
