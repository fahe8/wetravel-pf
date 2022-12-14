var nodemailer = require("nodemailer");
const {Order, User} = require ("../../db")
const {Router} = require("express");
const routerMail = Router()


routerMail.post("/", async (req, res) => {
    //console.log("Email enviado con éxito")

    const {email, data} = req.body
    const userFind = await User.findOne({
        where:{email}
    })
    console.log("Este es el" + data)

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
        const msg = data.map(dat => {
            return  "<ul>"+
            "<li>"+dat.nameHotel+"</li>"+
           " <li>"+"Room: "+dat.nameRoom+"</li>"+
            "<li>" +"precio: " +dat.price + "</li>"+
            "<li> check in: " +dat.check_in+ "</li>"+
            "<li> check out: " +dat.check_out+ "</li>"+
            "<li> Cantidad de noches: " +dat.quantity+"</li>"+
            "<li> Correo de la reservación: " +email+"</li>"+
        "</ul>"
           
        })
        return msg
    }
    

    var mailOptions = {
        from: '"WeTravel" <appwetravel77@gmail.com> ', //desde donde llega el email
        to: email,  //paras quien: use.user.email
        subject: "Información Reserva WeTravel ",
        html: ` 
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">

 
  <style>
    table, td, div, h1, p {font-family: Arial, sans-serif;}
  </style>
</head>
<body style="margin:0;padding:0;">
  <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
    <tr>
      <td align="center" style="padding:0;">
        <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
          <tr>
            <td align="center" style="padding:40px 0 30px 0;background:#9cb6c0;">
              <img src="../../../../client//src//assets//img//logo-1500px.png" alt="" width="200" style="height:auto;display:block;" />
            </td>
          </tr>
          <tr>
            <td style="padding:36px 30px 42px 30px;">
              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                <tr>
                  <td style="padding:0 0 36px 0;color:#153643;">
                    <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Hola! ${userFind.name}.</h1>
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                    Este es el comprobante de tu reserva en WeTravel</p>
                    <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="http:http://localhost:3000/home" style="color:#2421f7;text-decoration:underline;">Acá puedes ver mas hoteles</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;">
                   <h3> Aca están los principales datos de tu reserva</h3>
                  ${mapeo()}
                  </td>
                  <tr>
                    <td>
                 
                </td>
                </tr>

                <tr>
                    <td>
                  <h5>Gracias por tu confianza Estamos trabajando y mejorando por ti, un abrazo y feliz viaje.
                     WeTravel 💙</h5>
                </td>
                </tr>

                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:30px;background:#4c6a8d;">
              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                <tr>
                  <td style="padding:0;width:50%;" align="left">
                    <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                      &reg; Todos los derechos reservados<br/><a href="http://localhost:3001/" style="color:#ffffff;text-decoration:underline;">www.wetravel.com</a>
                    </p>
                  </td>
                  <td style="padding:0;width:50%;" align="right">
                    <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                      <tr>
                        <td style="padding:0 0 0 10px;width:38px;">
                          <a href="http://www.twitter.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
                        </td>
                        <td style="padding:0 0 0 10px;width:38px;">
                          <a href="http://www.facebook.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.status(500).send(error.message)
        } else {
            console.log("Email de confirmación de pago enviado con éxito")
            res.status(200).json(req.body)
        }
    });
});

module.exports = routerMail;

