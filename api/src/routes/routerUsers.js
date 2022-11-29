const { Hotel, User } = require("../db");
// const { hotel, user } = require("../db");
const {Router} = require("express");
const routerUsers = Router();

routerUsers.post('/', async (req, res) => {
  const { name, email, email_verified, status } = req.body;
  try {
    const search = await User.findOne({where:
      {email: email}})
      if(!search){
        let newUser = await User.create({ name, email, email_verified, status });
        // let hotelDb = await Hotel.findAll({
        //   where: {
        //     name: nameHotel,
        //   }
        // });
        // newUser.addHotel(hotelDb);

    return res.json({ message: `El Usuario: ${name} se registró exitosamente` });
    } else{
    return res.json({ message: `Este mail ya se registro con otro usuario`})
    }
    
  } catch (error) {
    return res.send(`Error en POST por: (${error})`);
  }
});

routerUsers.get('/', async (req, res) => {
  let allUser = await User.findAll({
    include: {
      model: Hotel,
      attributes: ['name'],
      through: { attributes: [], }
    }
  });

  return res.json(allUser);
});

module.exports = routerUsers;