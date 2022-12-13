var nodemailer = require("nodemailer");
const {Order, User} = require ("../../db")
const {Router} = require("express");
const routerMailCreate = Router()

routerMailCreate.post("/", async (req, res) => {

    const { email, data } = req.body;
    
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
        to: email,  //paras quien: use.user.email
        subject: "Notificación creación Hotel Wetravel ",
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
                    <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Hola! ${data.user}.</h1>
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                    Estamos muy contentos de que hayas tomado la desición de ser nuestro socio y que te ayudemos a dar la visibilidad a tu hotel para que así muchas mas personas alredeor del mundo encuentren un buen sitio de descanso como lo es el tuyo</p>
                    <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"><a href="http:http://localhost:3000/anfitrion/hotels" style="color:#2421f7;text-decoration:underline;">Acá puedes ver todos tus hoteles</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;">
                   <h3> Aca están los principales datos de tu hotel</h3>
                   <ul>
                    <li><b>Nombre:</b> ${data.name}</li>
                    <li><b>Precio:</b> ${data.price}</li>
                    <li><b>Ubicación:</b> ${data.continent}, ${data.location}, ${data.city} </li>
                    <li><b>Descripción:</b> ${data.description}</li>
                   </ul>
                  </td>
                  <tr>
                    <td>
                  <h5>En caso de que los datos de tu hotel no sean los de este mensaje, te invitamos a que entres a tu perfil de anfitrión y modifiques tu hotel</h5>
                </td>
                </tr>

                <tr>
                    <td>
                  <h5>Estamos trabajando y mejorando por ti, un abrazo WeTravel 💙</h5>
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
</html>
        `

    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.status(500).send(error.message)
        } else {
            console.log("Email de confirmación de hotel creado enviado con éxito")
            res.status(200).json(req.body)
        }
    });
})

module.exports = routerMailCreate;
