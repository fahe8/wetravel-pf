const { Router } = require("express");
const routerImage = Router();
const { Image, User } = require("../db");

routerImage.post("/", async (req, res) => {
  const { images, nameUser } = req.body;

  try {
    let newImages = await Image.create({ images, nameUser });
    // console.log('NEW IMG:', newImages.__proto__)

    let userDb = await User.findOne({
      where: { name: nameUser },
    });

    newImages.setUser(userDb);
    res.json(newImages);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = routerImage;
