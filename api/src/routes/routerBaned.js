const { User } = require("../db");
const { Router } = require("express");
const routerBaned = Router();

routerBaned.put("/:id", async (req, res) => {
  const { id } = req.params;
  let baned = req.body;
  console.log("baned", baned);

  try {
    await User.update(baned, {
      where: { id },
    });
    res.json(baned);
  } catch (error) {
    res.json(`No se puedo actualizar por: (${error})`);
  }
});

module.exports = routerBaned;
