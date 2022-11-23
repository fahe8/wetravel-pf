const { Hotel, User } = require("../db");
const {Router} = require("express");
const routerHotels = Router();
const apiData = require("../../hotels.json");



routerHotels.get("/", async (req, res) => {
    const hotels = [];
    // const apiUrl = apiData.map(el => el);
    
    for(let i =0; i< apiData.length; i++){
        const ele = apiData[i];
        hotels.push(ele);
    }
    // hotels.push(apiUrl);

    const hotelDb = await Hotel.findAll({
        include: [{
            model: User,
            attributes: ["userId", "name"],
            through: {
                attributes: []
                }
            }
        ]
    });

    hotelDb.map(el => el.dataValues);
    hotels.push(hotelDb);
    // console.log(hotels);
    res.send(hotels);
})

module.exports = routerHotels;