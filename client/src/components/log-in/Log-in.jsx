import React from 'react';
import { Link } from 'react-router-dom';




function Login() {
  return (
    <div>
      <h5 className="text-3xl ">Iniciar Sesion</h5>
        <form>
          <label  className=''>
            Usuario
          </label> 
          <input  type="text" className=''>
          </input>
          <label className=''>
            Contraseña
          </label>
          <input type="password" className=''/>
          <button>
            ingresar 
          </button>
        </form>
        <div className='flex justify-center'>
          <Link to="/Signup">
            <h5>Crear usuario</h5>
          </Link>
        </div>
        <p>o</p>
        <div className='center block'>
          <button className=''>
            <img className='inline' src="https://cdn-icons-png.flaticon.com/128/174/174848.png" width="30px" height="30px" alt="not found" />
            <span className='' >Registrarse con Facebook
            </span>
          </button>
          <button>
            <img className='inline' src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="30px" height="30px" alt="not found" />
            <span>Registrarse con Linkedin
            </span>
          </button>
          <button>
            <img className='inline' src="https://cdn-icons-png.flaticon.com/128/281/281764.png" width="30px" height="30px" alt="not found" />
            <span>Registrarse con Google
            </span>
          </button>
          <button >
            <img className='inline' src="https://cdn-icons-png.flaticon.com/512/174/174876.png" width="30px" height="30px" alt="not found" />
            <span>Registrarse con twitter
            </span>
          </button>
        </div>
    </div>
  
  )
}

export default Login;