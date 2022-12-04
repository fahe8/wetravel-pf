import emailjs from "emailjs-com";
import React from "react";

export default function Mail() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_61sxref', 'template_y8634l7', e.target, 'lAYpfwBkuG3WBUVMB')
      .then((result) => {
        alert("mensaje enviado con éxito");
      }, (error) => {
        alert(error.message)
      });
    e.target.reset()
  }

  return (
        <div>
            <div >
        <h2>Contacto</h2>
            <form onSubmit={sendEmail}>
                    <div >
                        <div >
                            <label>Nome</label>
                            <input type="text" autoFocus  required placeholder="Nome" name="name"/>
                        </div>
                        <div className="col-lg-8 col-sm-12 form-group pt-1 mx-auto">
                        <label>Email</label>
                            <input type="email"  required placeholder="Seu email" name="email"/>
                        </div>

                        <div>
                             <textarea  id="" cols="30" rows="8" required placeholder="Sua mensagem" name="message"></textarea> 
                        </div>
                        <div className="col-lg-8 col-sm-12 pt-3 mx-auto">
                            <button type="submit"  value="Enviar mensagem"> enviar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}