const { Hotel, User } = require("../db");
const {Router} = require("express");
const routerHotels = Router();
const apiData = require("../../hotels.json");

const getHotels = async () => {
    const dataDb = await Hotel.findAll({
        include: [{
            model: User,
            attributes: ["name"],
            through: {
                attributes: []
                }
            }
        ]
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
    const { name } = req.query;
    try {
        const hotels = await getHotels();

        if(name && hotels.length){
            const hotelName = hotels.find(el => el.name.toLowerCase().includes(name.toLowerCase()));
            hotelName ? res.status(200).send(hotelName) : res.status(404).send("No Hotel with that name");
        };
        if(req.query.stars) {
            const filterStars = hotels.filter(el => el.stars === req.query.stars);
            if(!filterStars.length) res.status(404).send("Enter stars 1 to 5");
            return res.send(filterStars);   
        }

        if(hotels.length && !name){
            res.status(200).send(hotels);
        };

    } catch (error) {
        res.status(400).send(error.message);
    }
});

routerHotels.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const hotels = await getHotels();
        if(id && hotels.length){
            const hotelId = hotels.find(el => el.id == id);
            hotelId ? res.status(200).send(hotelId) : res.status(404).send("No Hotel with that Id");
        };
    } catch (error) {
        res.status(400).send(error.message);
    }
});

routerHotels.post("/", async (req, res) => {
    let { name, description, stars, price, services, photos, continent, location, city, comments, review, room, user } = req.body;
    try {
        let newHotel = await Hotel.create({
            name, description, stars, price, services, photos, continent, location, city, comments, review, room
        });

        let userDb = await User.findAll({
                where: { name: user }
        });

        newHotel.addUser(userDb);
        res.status(200).send(newHotel);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


module.exports = routerHotels;