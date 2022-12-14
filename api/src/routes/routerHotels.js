const { Hotel, User } = require("../db");
const { Router } = require("express");
const routerHotels = Router();
const apiData = require("../../hotels.json");
const { Op } = require("sequelize");
// const { Op } = require("sequelize");

const getHotels = async () => {
  const dataDb = await Hotel.findAll({
    include: [
      {
        model: User,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      }
    ],
  });

    if(!dataDb.length){
      const apiInfo = apiData.map(el => {
          return {
              id: el.id,
              name: el.name,
              description: el.description,
              stars: el.stars,
              price: el.price,
              services: el.services.map(ele => ele),
              photos: el.photos.map(ele => ele),
              continent: el.continent,
              location: el.location,
              city: el.city,
              review: el.review,
              comments: el.comments,
              room: el.room
          }
      });
      const hotels = await Hotel.bulkCreate(apiInfo);
      // console.log(hotels);
      return hotels;
  }
  if(dataDb.length){
      return dataDb;
  }
};

routerHotels.get("/", async (req, res) => {

  const { search, stars, priceMin, priceMax, servicies, page } = req.query;
  try {
    const hotels = await getHotels();

    let resultadoDeBusqueda = [];
    if (search ) {

      
      let hotelName = hotels.filter((el) =>
        el.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
     // console.log(hotelName);
      let filterLocation = hotels.filter((el) =>
        el.location
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
     // console.log(filterLocation);
      let filterCity = hotels.filter((el) =>
        el.city
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      //console.log(filterCity);

      let filtercontinent = hotels.filter((el) =>
        el.continent
          
          .toLowerCase()
          .includes(search.toLowerCase())
      );


      const arr = [...new Set([...hotelName, ...filterCity, ...filterLocation, ...filtercontinent])];
      resultadoDeBusqueda = arr;
    }

    if (stars || priceMin || priceMax || servicies) {
      if (priceMax && priceMin) {
        if (resultadoDeBusqueda.length > 0) {
          let pri = resultadoDeBusqueda.filter((el) => {
            return (
              Number(el.price) <= Number(priceMax) &&
              Number(el.price) >= Number(priceMin)
            );
          });
          resultadoDeBusqueda = pri;
        } else {
          let pri = hotels.filter((el) => {
            return (
              Number(el.price) <= Number(priceMax) &&
              Number(el.price) >= Number(priceMin)
            );
          });
          resultadoDeBusqueda = pri;
        }
      }

      if (stars) {
        if (resultadoDeBusqueda.length > 0) {
          let filterStars = resultadoDeBusqueda.filter(
            (el) => el.stars === stars
          );
          resultadoDeBusqueda = filterStars;
        } else {
          let filterStars = hotels.filter((el) => el.stars === stars);
          resultadoDeBusqueda = filterStars;
        }
      }

      return res.send(resultadoDeBusqueda);

      
    }

    if(resultadoDeBusqueda.length) {
      return res.send(resultadoDeBusqueda)

    } else {
      
      // const dataDb = await Hotel.findAndCountAll({
      //   limit: 5,
      //   offset: page*5,
      //   include: [
      //     {
      //       model: User,
      //       attributes: ["name"],
      //       through: {
      //         attributes: [],
      //       },
      //     }
      //   ],
      // });
      return res.send(hotels)
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

routerHotels.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const hotels = await getHotels();
    if (id && hotels.length) {
      const hotelId = hotels.find((el) => el.id == id);
      hotelId
        ? res.status(200).send(hotelId)
        : res.status(404).send("No Hotel with that Id");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

routerHotels.post("/", async (req, res) => {
  let {
    name,
    description,
    stars,
    price,
    services,
    photos,
    continent,
    location,
    city,
    comments,
    review,
    room,
    user,
  } = req.body;
  try {
    let newHotel = await Hotel.create({
      name,
      description,
      services,
      stars,
      price,
      photos,
      continent,
      location,
      city,
      comments,
      review,
      room,
    });

    let userDb = await User.findAll({
      where: { name: user },
    });


    newHotel.addUser(userDb);
    res.status(200).send(newHotel);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// -------> Router Delete

routerHotels.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const hotel = await Hotel.findByPk(id);
    // const date = Date();
    
    // if(date > DATEADD(DAY, 1, date)){
    //   await hotel.destroy();
    //   res.status(200).send ("Hotel eliminado de nuestra base de datos")
    // }

    if (!hotel) {
      res.status(404).send("El id de el hotel no existe en nuestra base de datos");
    } 
    else {
      await hotel.destroy();
      res.status(200).send(`Hotel ${id} ha sido eliminado`);
    }
  } catch (error) {
    next(error)
  }
})

routerHotels.put('/:id', async (req,res) => {
  const { id } = req.params;
  let hotel = req.body;

  try {
    await Hotel.update(hotel, {
      where: { id }
    });
    res.json({ change: 'Los datos del Hotel se actualizaron correctamente' });
  } catch (error) {
    res.json(`No se puedo actualizar por: (${error})`);
  }
})

module.exports = routerHotels;
