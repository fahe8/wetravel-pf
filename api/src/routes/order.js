const {Router} = require('express');
const { Sequelize, Op } = require('sequelize');
const server = Router()
const { Order , Reserves, Hotel } = require('../db');



server.post('/', async (req, res, next) => {
    const { user, orderlines } = req.body
    console.log(req.body)
    if(!user && !orderlines) {
        res.status(400)
        .send('Cuidado! Faltan datos para poder crear una orden')
    }
    else {
       console.log(user)
        const order =  await Order.findOne({
            where: {user_email: user}
         })
         console.log(order)
         !order && res.send("Si el usuario no existe no se puede encontrar una order")


         Promise.all(
            orderlines.map(async elem => {
                const producto = await Hotel.findByPk(elem.idHotel)

                const orderId = order.dataValues.id

                // const findReserve = await Reserves.findOne({
                //     where: {
                //         [Op.and]: [
                //             Sequelize.where(Sequelize.fn('date', Sequelize.col('check_in')), '=', elem.check_in),
                //             Sequelize.where(Sequelize.fn('date', Sequelize.col('check_out')), '=', elem.check_out),
                //         ]

                // }
                // })
                // console.log(findReserve)
                // if(findReserve){return []}

                return Reserves.create({
                    orderId: orderId,
                    userId: order.dataValues.id,
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


         res.send("Todo salió bien")

    }





});


server.get('/:idUser/cart', (req, res, next) => {
    Order.findOne({
        where: {
            [Op.and]: [
                { userId: req.params.idUser }, 
                { status: {
                    [Op.or]: ['cart', 'created']
                }} 
            ]
        },
        include: Order_detail
    })   
    .then(function(detail) {
        res.send(detail.order_details)
    }).catch(error => {
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



module.exports = server;