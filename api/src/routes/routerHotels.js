const { Hotel, User, Service } = require("../db");
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
      {
        model: Service,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  if (!dataDb.length) {
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
        name: el.name,
        description: el.description,
        stars: el.stars,
        price: el.price,
        photos: el.photos.map((ele) => ele),
        continent: el.continent,
        location: el.location,
        city: el.city,
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
  }
  if (dataDb.length) {
    return dataDb;
  }
};

routerHotels.get("/", async (req, res) => {
  const { search, stars, priceMin, priceMax, servicies } = req.query;

  try {
    const hotels = await getHotels();

    let resultadoDeBusqueda = [];
    if (search && hotels.length) {
      let hotelName = hotels.filter((el) =>
        el.name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      console.log(hotelName);
      let filterLocation = hotels.filter((el) =>
        el.location
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      console.log(filterLocation);
      let filterCity = hotels.filter((el) =>
        el.city
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      console.log(filterCity);

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
              el.price.split("$")[1].split(".").join("") <= Number(priceMax) &&
              el.price.split("$")[1].split(".").join("") >= Number(priceMin)
            );
          });
          resultadoDeBusqueda = pri;
        } else {
          let pri = hotels.filter((el) => {
            return (
              el.price.split("$")[1].split(".").join("") <= Number(priceMax) &&
              el.price.split("$")[1].split(".").join("") >= Number(priceMin)
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

    if(resultadoDeBusqueda.length) {
      return res.send(resultadoDeBusqueda)

    } else {
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
    let servicesDb = await Service.findAll({
      where: { name: services },
    });

    newHotel.addUser(userDb);
    newHotel.addService(servicesDb);
    res.status(200).send(newHotel);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = routerHotels;
