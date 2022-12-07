const { User, Hotel, Review } = require("../db");
const { Router } = require("express");

const routerReview = Router();

routerReview.get("/", async (_req, res) => {

  try {
    let reviewDb = await Review.findAll({
      includes: {
        model: Hotel, User,
        attributes: ["stars", "comments", "nameUser", "nameHotel"],
        through: { attributes: [] },
      },
    });

    reviewDb.length
      ? res.send(reviewDb)
      : res.status(400).send("No hay ningun comentario hasta el momento");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

routerReview.post("/", async (req, res) => {
  let { stars, comments, nameUser, nameHotel } = req.body;

  try {
    let newReview = await Review.create({
      stars,
      comments,
      nameUser,
      nameHotel,
    });

    let userDb = await User.findAll({
      where: { name: nameUser },
    });

    let hotelDb = await Hotel.findAll({
      where: { name: nameHotel },
    });

    newReview.setUser(userDb.id);
    newReview.setHotel(hotelDb.id);
    res.status(200).send(newReview);
  } catch (error) {
    res.json({ error: `Error en POST REV por: (${error})` });
  }
});

routerReview.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      res
        .status(404)
        .send("El id de la review no existe en nuestra base de datos");
    } else {
      await review.destroy();
      res.status(200).send("Review eliminada de nuestra base de datos");
    }
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = routerReview;
