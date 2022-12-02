const {Router} = require('express');
const { Sequelize } = require('sequelize');
const server = Router()
const { Order , Reserves, Hotel } = require('../db');


server.post('/', async (req, res, next) => {
    const { user, orderlines } = req.body
    console.log(orderlines[0].idHotel)
    console.log(user)

    // orderlines = [{idHotel: 3243, quantity;1, check_out:2022-12-4,
    //     check_in:2022-12-2  },  ]
    // user: "fabian"
    // status: "created"

    if(!user && !orderlines) {
        res.status(400)
        .send('Cuidado! Faltan datos para poder crear una orden')
    }
    else {
       
        const order =  await Order.findOne({
            where: {userId: user}
         })

         !order && res.send("Si el usuario no existe no se puede encontrar una order")


         Promise.all(
            orderlines.map(async elem => {
                const producto = await Hotel.findByPk(elem.idHotel)

                const orderId = order.dataValues.id

                const findReserve = await Reserves.findOne({
                    where: {
                        [Op.and]: [
                            Sequelize.where(Sequelize.fn('date', Sequelize.col('check_in')), '=', elem.check_in),
                            Sequelize.where(Sequelize.fn('date', Sequelize.col('check_out')), '=', elem.check_out),
                        ]

                }
                })
                console.log(findReserve)
                if(findReserve){return []}

                return Reserves.create({
                    orderId: orderId,
                    userId: user,
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