const { Hotel, User, Order } = require("../db");
// const { hotel, user } = require("../db");
const { Router } = require("express");
const routerUsers = Router();

routerUsers.post("/", async (req, res) => {
  const { name, email, email_verified, status, photos } = req.body;
  try {
    const search = await User.findOne({ where: { email: email } });
    if (!search) {
      const user = User.create({
        email,
        name,
        email_verified,
        status,
        photos,
      });

      Order.create({
        status: "created",
        user_email: user.dataValues.email,
        userId: user.dataValues.id,
      });

      let hotelDb = await Hotel.findAll({
        where: {
          name: nameHotel,
        },
      });
      newUser.addHotel(hotelDb);

      return res.status(201).send("Usuario creado con éxito");
    } else {
      res.send("Ya existe");
    }
  } catch (error) {
    return res.send(`Error en POST por: (${error})`);
  }
});

routerUsers.put("/:email", async (req, res) => {
  let { email } = req.params;
  let user = req.body;

  try {
    let updateUser = await User.update(user, {
      where: { email },
    });
    res.json({ change: "Los datos del Usuario se actualizaron correctamente" });
  } catch (error) {
    res.json(`No se puedo actualizar por: (${error})`);
  }
});

routerUsers.get("/", async (req, res) => {
  let allUser = await User.findAll({
    include: {
      model: Hotel,
      through: { attributes: [] },
    },
  });

  return res.json(allUser);
});

routerUsers.get("/:email", async (req, res) => {
  let { email } = req.params;
  try {
    let getUser = await User.findOne({
      where: { email: email },
      include: {
        model: Hotel,
        through: { attributes: [] },
      },
    });
    //console.log(getUser);
    return res.json(getUser);
  } catch (error) {
    res.json(`No se pudo obtener el EMAIL por: (${error})`);
  }
});

module.exports = routerUsers;
