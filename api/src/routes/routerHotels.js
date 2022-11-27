<<<<<<< HEAD
const { Hotel, User } = require("../db");
=======
const { Hotel, User, Service } = require("../db");
>>>>>>> 7da0cd46d63fa909279c7e2621c839bcda6e1e57
const { Router } = require("express");
const routerHotels = Router();
const apiData = require("../../hotels.json");
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
      },
<<<<<<< HEAD
=======
      {
        model: Service,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
>>>>>>> 7da0cd46d63fa909279c7e2621c839bcda6e1e57
    ],
  });

  if (!dataDb.length) {
<<<<<<< HEAD
    const apiInfo = apiData.map((el) => {
      return {
        id: el.id,
=======
    const servicesRepeat = apiData
      .map((data) => data.services)
      .join()
      .split(",");
    const servicesNoRepeat = [...new Set(servicesRepeat)];
    servicesNoRepeat.map((service) =>
      Service.findOrCreate({
        where: {
          name: service,
        },
      })
    );
    apiData.map(async (el) => {
      const addHotelDb = await Hotel.create({
>>>>>>> 7da0cd46d63fa909279c7e2621c839bcda6e1e57
        name: el.name,
        description: el.description,
        stars: el.stars,
        price: el.price,
<<<<<<< HEAD
        services: el.services.map((ele) => ele),
=======
>>>>>>> 7da0cd46d63fa909279c7e2621c839bcda6e1e57
        photos: el.photos.map((ele) => ele),
        continent: el.continent,
        location: el.location,
        city: el.city,
<<<<<<< HEAD

        review: el.review,
        comments: el.comments,
        room: el.room,
      };
    });
    const hotels = await Hotel.bulkCreate(apiInfo);
    // console.log(hotels);
    return hotels;
=======
        review: el.review,
        comments: el.comments,
        room: el.room,
      });

      const relacion = await Service.findAll({
        where: {
          name: el.services,
        },
      });
      addHotelDb.addService(relacion);
    });
>>>>>>> 7da0cd46d63fa909279c7e2621c839bcda6e1e57
  }
  if (dataDb.length) {
    return dataDb;
  }
};

routerHotels.get("/", async (req, res) => {
<<<<<<< HEAD
  const { name, continent, stars, location, city, price } = req.query;
  try {
    const hotels = await getHotels();

=======
  const {
    name,
    continent,
    location,
    city,
    stars,
    priceMin,
    priceMax,
    servicies,
  } = req.query;

  try {
    const hotels = await getHotels();

>>>>>>> 7da0cd46d63fa909279c7e2621c839bcda6e1e57
    if (name && hotels.length) {
      const hotelName = hotels.find((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      hotelName
        ? res.status(200).send(hotelName)
        : res.status(404).send("No Hotel with that name");
    }
<<<<<<< HEAD
    if (stars) {
      try {
        let filterStars = hotels.filter((el) => el.stars === stars);
        console.log("FILTRO:", filterStars.length);
        if (!filterStars.length) {
          return res.status(400).send("No match  with that star");
        }
        return res.send(filterStars);
      } catch (error) {
        res.status(400).send(error.message);
      }
    }
    if (price) {
      try {
        let filterPrice = hotels.filter((el) => el.price === price);
        // console.log('FILTRO price:', filterPrice.length);
        if (!filterPrice.length) {
          return res.status(400).send("No match with that price");
        }
        return res.json(filterPrice);
      } catch (error) {
        res.status(400).send(error.message);
      }
    }
=======

    if (stars || priceMin || priceMax || servicies) {


    let filtrado = []
    if (priceMax && priceMin) {
      let pri = hotels.filter((el) => {
        return (
          el.price.split("$")[1].split(".").join("") <= Number(priceMax) &&
          el.price.split("$")[1].split(".").join("") >= Number(priceMin)
        );
        
        
      });
      filtrado = pri
    } 

    if(stars) {
        if(filtrado.length > 0) {
            let filterStars = filtrado.filter((el) => el.stars === stars);
            filtrado = filterStars;
        } else {

            let filterStars = hotels.filter((el) => el.stars === stars);
             filtrado = filterStars;
        }
    }

    return res.send(filtrado)
    
        // if (servicies.includes(",")) {

        //   const serviciesSearch = servicies.split(",");

        //   await Hotel.findAll({
        //     where: {price: {[Op.between]: [priceMin, priceMax]}, stars: stars },
        //     include: {
        //       model: Service,
        //       attributes: ["name"],
        //       where: {name: serviciesSearch},
        //       through: {
        //         attributes: [],
        //       },
        //     },
        //   });
        // }

        // await Hotel.findAll({
        //     where: {price: {[Op.between]: [priceMin, priceMax]}, stars: stars },
        //     include: {
        //       model: Service,
        //       attributes: ["name"],
        //       where: {name: servicies},
        //       through: {
        //         attributes: [],
        //       },
        //     },
        //   });
      


      
    }

>>>>>>> 7da0cd46d63fa909279c7e2621c839bcda6e1e57
    if (continent) {
      try {
        let filtercontinent = hotels.filter((el) =>
          el.continent.toLowerCase().includes(continent.toLowerCase())
        );
        // console.log('FILTRO:', filtercontinent.length);
        if (!filtercontinent.length) {
          return res.status(400).send("No match  with that continent");
        }
        return res.send(filtercontinent);
      } catch (error) {
        res.status(400).send(error.message);
      }
    }

    if (location) {
      try {
        let filterLocation = hotels.filter((el) =>
          el.location.toLowerCase().includes(location.toLowerCase())
        );
        // console.log('FILTRO:', filterLocation.length);
        if (!filterLocation.length) {
          return res.status(400).send("No match  with that location");
        }
        return res.send(filterLocation);
      } catch (error) {
        res.status(400).send(error.message);
      }
    }

    if (city) {
      try {
        let filterCity = hotels.filter((el) =>
          el.city.toLowerCase().includes(city.toLowerCase())
        );
        // console.log('FILTRO:', filterCity.length);
        if (!filterCity.length) {
          return res.status(400).send("No match  with that city");
        }
        return res.send(filterCity);
      } catch (error) {
        res.status(400).send(error.message);
      }
    }

    if (hotels.length && !name) {
      res.status(200).send(hotels);
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
      stars,
      price,
<<<<<<< HEAD
      services,
=======
>>>>>>> 7da0cd46d63fa909279c7e2621c839bcda6e1e57
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
<<<<<<< HEAD

    newHotel.addUser(userDb);
=======
    let servicesDb = await Service.findAll({
      where: { name: services },
    });

    newHotel.addUser(userDb);
    newHotel.addService(servicesDb);
>>>>>>> 7da0cd46d63fa909279c7e2621c839bcda6e1e57
    res.status(200).send(newHotel);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = routerHotels;
