const {Router} = require('express');
const { Sequelize, Op } = require('sequelize');
const server = Router()
const { Order , Reserves, Hotel, User } = require('../db');



server.post('/', async (req, res, next) => {
    const { user, orderlines } = req.body
    //console.log(req.body)
    if(!user && !orderlines) {
        res.status(400)
        .send('Cuidado! Faltan datos para poder crear una orden')
    }
    else {

        let order =  await Order.findOne({
            where: {user_email: user, status: "created"}
         })

        if(!order) {
            const userFind = await User.findOne({
                where: {email: user}
              })

            order = await Order.create({
                status: "created",
                user_email: user,
                userId: userFind.dataValues.id    
            })
        }
         



         Promise.all(
            orderlines.map(async elem => {
                const producto = await Hotel.findByPk(elem.idHotel)

                const orderId = order.dataValues.id

                return Reserves.create({
                    orderId: orderId,
                    userId: order.dataValues.userId,
                    nameHotel: producto.name,
                    nameRoom: producto.room.name,
                    check_out:elem.check_out,
                    check_in:elem.check_in,
                    quantity: elem.quantity,
                    userReserve: user,
                    price: producto.price
                })
             })
         )


         res.status(200).send("Todo salió bien")

    }





});


server.get('/:user/cart', (req, res, next) => {
    
    Order.findOne({
        where: {
            [Op.and]: [
                { user_email: req.params.user }, 
                { status: 'created'} 
            ]
        },
        include: Reserves
    })   
    .then(function(detail) {
        res.send(detail.reserves)
    }).catch(error => {
        console.log(error)
        res.sendStatus(400)
    })
}) 

server.get('/detalle/:id', (req, res, next) => {
    const id = req.params.id

    Order.findOne({
        where: {
          id: id,
        },
        include: {
            model: Reserves,
            where: { orderId: id }
        }
    })
    .then(obj => {
        res.send(obj)
    })
    .catch(next)
});

server.delete('/:user/cart')


module.exports = server;