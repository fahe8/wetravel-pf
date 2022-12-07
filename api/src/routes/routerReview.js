const { User, Hotel, Review } = require("../db");
const { Router } = require("express");

const routerReview = Router();

routerReview.get("/", async (req, res) => {
  try {
    const dataDb = await Review.findAll({
      includes: {
        model: User, Hotel,
        // as: "user", "hotel",
        attributes: ["name"],
        through: { attributes: [], },
      },
      attributes: ["stars", "comments", "nameUser", "nameHotel"],
    });
    dataDb.length ? res.send(dataDb) : res.status(400).send("no se encuentra");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

routerReview.post("/", async (req, res) => {
  let { stars, comments, nameUser, nameHotel } = req.body;
  // console.log('NAME USER REV:', nameUser)
  // console.log('NAME HOTEL REV:', nameHotel)
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

    newReview.addUser(userDb);
    newReview.addHotel(hotelDb);
    res.status(200).send(newReview);
  } catch (error) {
    res.status(400).send(error.message);
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
