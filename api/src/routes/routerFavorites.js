const { Router } = require('express');
const { User, Favorites } = require('../db');
const routerFavorites = Router();

routerFavorites.get('/:user', async (req, res) => {
    const { user } = req.params;
    try {
        if(user){
            const userFavorites = await Favorites.findAll({
                where: { userFavorite: user },
            })
            userFavorites.length ? 
            res.json(userFavorites)
            : res.status(404).json({message: "This user hasnt any favorite yet"});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

routerFavorites.post('/', async (req, res) => {
    const { name, stars, price, photos, location, city, userFavorite } = req.body;
    try {
        const newFavorite = await Favorites.create({
            name, stars, price, photos, location, city, userFavorite
        });
        const userDb = await User.findOne({
            where: { name: userFavorite }
        });
        newFavorite.setUser(userDb);
        res.json(newFavorite);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

routerFavorites.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const favorite = await Favorites.findOne({
            where: {id}
        });

        await favorite.destroy()
        res.json({message: 'Favorite deleted'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

module.exports = routerFavorites;