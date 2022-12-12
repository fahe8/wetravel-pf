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
        subject: "Información Reserva WeTravel ",
        html: `
        <html>
         <div>
            <p>Ten un buen saludo desde el equipo de WeTravel</p>

            <p> Hola, juan estos son los datos de tu reservación </p>

            <ul>
                <li>  Hotel: {nameHotel}</li>
                <li>Room: {nameRoom}</li>
                <li> precio: {price} </li>
                <li> check in {check_in} </li>
                <li> check out {check_out} </li>
                <li> Cantidad de noches {quantity} </li>
                <li> Correo de la reservación {userReserve} </li>
            </ul>

            <p> Muchas gracias por contar con nosotros y esperamos acompañarte en la busqueda de tus sitios de descanso</p>

            <p> Un abrazo, WeTavel 🎅🏿</p>
            <img  src="https://ibb.co/jJ2HWjS" alt="Logotipo"/>
        
        </div>
        </html>
        `
        
        
   
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

