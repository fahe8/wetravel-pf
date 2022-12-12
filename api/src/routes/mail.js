var nodemailer = require("nodemailer");
const {Order} = require ("../db")
const {Router, Reserves, User} = require("express");
const routerMail = Router()


routerMail.post("/", async (req, res) => {
    //console.log("Email enviado con éxito")

    const {email} = req.body

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_PASSWORD_SENDER,
        },
    });

    

    var mailOptions = {
        from: '"WeTravel" <appwetravel77@gmail.com> ', //desde donde llega el email
        to: "juanrodriguez9502@gmail.com",  //paras quien: use.user.email
        subject: "Prueba mensaje",
        html: "<b> Un nuevo texto de prueba<b>    Esta es tu ${order_id} "
        
        
    //abrir back tips para hacer el mensaje
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message)
        } else {
            console.log("Email enviado con éxito")
            res.status(200).json(req.body)
        }
    });
});


module.exports = routerMail;

