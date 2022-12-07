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

routerImage.get("/", async (req,res)=> {
  try{
      const dataDb= await Image.findAll({
          includes:{
              model: User,
              as: "user", 
              attributes: ["name"],
              through:{attributes:[],}
        }
      })
      dataDb.length? res.send(dataDb): res.status(400).send("No hay ninguna imagen")
  }catch(error){
      res.status(400).send(error.message)
  }

})
routerImage.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const image = await Image.findOne({
      where: {id}
    })

    if(!image) {
      res.send("No existe reserva con esta id")
    }

    await image.destroy()
    res.send("se eliminó la reserva con id:" + id)
  } catch (error) {
    console.log(error)
  }
})

module.exports = routerImage;
