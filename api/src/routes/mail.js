var nodemailer = require("nodemailer");
const {Order, User} = require ("../db")
const {Router} = require("express");
const routerMail = Router()


routerMail.post("/", async (req, res) => {
    //console.log("Email enviado con éxito")

    const {email, data} = req.body
    const userFind = await User.findOne({
        where:{email}
    })

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_PASSWORD_SENDER,
        },
    });


    const mapeo = () => {
        data.map(dat => {
            "<ul>"
                "<li></li>"
            "</ul>"
        })
    }
    

    var mailOptions = {
        from: '"WeTravel" <appwetravel77@gmail.com> ', //desde donde llega el email
        to: email,  //paras quien: use.user.email
        subject: "Información Reserva WeTravel ",
        html: ` 
        <html>
         <div>
            <p>Ten un buen saludo desde el equipo de WeTravel</p>

            <p> Hola, ${userFind.name} estos son los datos de tu reservación </p>

            <ul>
                <li>  Hotel: ${data.nameHotel}</li>
                <li>Room: ${data.nameRoom}</li>
                <li> precio: ${data.price} </li>
                <li> check in ${data.check_in} </li>
                <li> check out ${data.check_out} </li>
                <li> Cantidad de noches ${data.quantity} </li>
                <li> Correo de la reservación ${data.email} </li>
            </ul>

            <p> Muchas gracias por contar con nosotros y esperamos acompañarte en la busqueda de tus sitios de descanso</p>

            <p> Un abrazo, WeTavel 🎅🏿</p>
        
        </div>
        </html>`
        
        
    //abrir back tips para hacer el mensaje
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.status(500).send(error.message)
        } else {
            console.log("Email enviado con éxito")
            res.status(200).json(req.body)
        }
    });
});


module.exports = routerMail;

