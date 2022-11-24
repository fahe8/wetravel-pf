const { Hotel, User } = require("../db");
// const { hotel, user } = require("../db");
const {Router} = require("express");
const routerUsers = Router();

routerUsers.post('/', async (req, res) => {
  const { name, nameHotel } = req.body;

  try {
    let newUser = await User.create({ name });

    let hotelDb = await Hotel.findAll({
      where: {
        name: nameHotel,
      }
    });

    newUser.addHotel(hotelDb);
    return res.json({ message: `El Usuario: (${name}) se registró exitosamente` });
  } catch (error) {
    return res.send(`Error en POST por: (${error})`);
  }
});

routerUsers.get('/', async (_req, res) => {
  let allUser = await User.findAll({
    include: {
      model: Hotel,
      attributes: ['name', 'description', 'stars', 'price', 'services', 'photos', 'continent', 'location', 'city', 'review', 'comments', 'room_name', 'room_properties', 'room_size', 'room_description', 'room_photos', 'createdInDb'],
      through: { attributes: [], }
    }
  });

  return res.json(allUser);
});

module.exports = routerUsers;