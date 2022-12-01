const {Router} = require('express')
const server = Router()
const { Order , Reserves, Hotel } = require('../db');

server.post('/', (req, res, next) => {
    const { user, orderlines, status } = req.body


    // orderlines = [{idHotel: 3243, quantity;1, check_out:2022-12-4,
    //     check_in:2022-12-2  },  ]
    // user: "fabian"
    // status: "created"

   
    Order.create({
        userId: user,
        status: status

    })
    .then(response => {
        Promise.all(
        orderlines.map(elem => {
            Hotel.findByPk( elem.idHotel)
              .then(producto =>{
                const orderId = response.dataValues.id //nos da el id de order
                
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
            })
        )
        .then( _ => res.send("OK"))
        .catch(err => next(err))
    })
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