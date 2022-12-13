const { Hotel, User, Reserves } = require("../db");
const { Router } = require("express");
const routerReserves = Router();

routerReserves.get("/", async (req,res)=> {
    try{
        const dataDb= await Reserves.findAll({
            includes:{
                model: User,
                as: "user", 
                attributes: ["name"]
          },
          attributes: ["id", "nameHotel", "nameRoom", "userReserve", "quantity"]
        })
        dataDb.length? res.send(dataDb): res.status(400).send("No hay ninguna reserva")
    }catch(error){
        res.status(400).send(error.message)
    }
  
})

routerReserves.get("/:user", async (req, res) => {
    const { user } = req.params;
    try {

      
      if (user ) {
        const userReserves =  await Reserves.findAll({
          where: {userReserve: user},
        })
        // const dataUser = Reserves.find((el) => el.user == user);
        // dataUser
        userReserves.length?
        res.status(200).send(userReserves)
        : res.status(404).send("this user has no reservation");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });



  routerReserves.post("/", async (req, res) => {
        let {
            nameHotel,nameRoom,price,check_in,check_out,userReserve, quantity
        } = req.body;
        try {
          let newReserve = await Reserves.create({
            nameHotel,nameRoom,price,check_in,check_out,userReserve,quantity
          });
      
          let userDb = await User.findOne({
            where: { name: userReserve },
          });
      
          userDb.addReserves(newReserve);
          res.status(200).send(newReserve);
        } catch (error) {
          res.status(400).send(error.message);
        }
    });
            

routerReserves.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    //console.log(id)
    const reserve = await Reserves.findOne({
      where: {id}
    })
    //console.log(reserve)
    if(!reserve) {
      res.send("No existe reserva con esta id")
    }

    await reserve.destroy()
    res.send("se eliminó la reserva con id:" + id)
  } catch (error) {
    //console.log(error)
  }
})


  module.exports = routerReserves