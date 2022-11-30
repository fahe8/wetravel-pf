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
          attributes: ["id", "nameHotel", "nameRoom", "userReserve"]
        })
        dataDb.length? res.send(dataDb): res.status(400).send("No hay ninguna reserva")
    }catch(error){
        res.status(400).send(error.message)
    }
  
})

routerReserves.get("/:user", async (req, res) => {
    const { user } = req.params;
    try {
      if (user && dataDb.length) {
        const dataUser = Reserves.find((el) => el.user == user);
        dataUser
          ? res.status(200).send(dataUser)
          : res.status(404).send("this user has no reservation");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  });



  routerReserves.post("/", async (req, res) => {
        let {
            nameHotel,nameRoom,price,check_in,check_out,userReserve
        } = req.body;
        try {
          let newReserve = await Reserves.create({
            nameHotel,nameRoom,price,check_in,check_out,userReserve
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
            




  module.exports = routerReserves