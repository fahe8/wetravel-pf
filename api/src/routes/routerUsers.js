const { Hotel, User, Order } = require("../db");
// const { hotel, user } = require("../db");
const {Router} = require("express");
const routerUsers = Router();

routerUsers.post('/', async (req, res) => {
  const { name, email, email_verified, status } = req.body;
  try {
    const search = await User.findOne({where:
      {email: email}})
      if(!search){

        User.create({
          email,
          name,
          email_verified,
          status
      })
      .then( user => {
          Order.create({
              status: "created",
              price: 0,
              quantity: 0,
              user_email: user.dataValues.email,
              userId: user.dataValues.id    
          })
      })
      .then( order => {
          return res.status(201).send("Usuario creado con éxito")
      })


        // let newUser = await User.create({ name, email, email_verified, status });

        // let orderwithUser = await Order.create({status:"created", price:0, quantity: 0, userId: newUser.dataValues.id})

        // newUser.addOrder(orderwithUser)
        // newUser
        
        // let hotelDb = await Hotel.findAll({
        //   where: {
        //     name: nameHotel,
        //   }
        // });
        // newUser.addHotel(hotelDb);
        
    // return res.status(202).json({ message: `El Usuario: ${name} se registró exitosamente` });
    // } else{
    // return res.status(203).json({ message: `Este mail ya se registro con otro usuario`})
    // }
    
  }} catch (error) {
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