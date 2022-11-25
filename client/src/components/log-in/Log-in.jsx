import React from 'react';
import {useAuth0} from "@auth0/auth0-react"


function Login() {
  
  const {loginWithRedirect} = useAuth0()
  const {logout} = useAuth0()

  return (<>

        <button onClick={() => loginWithRedirect() }>Log-in</button>
        <button onClick={() => logout({ returnTo: window.location.origin })}>Log-out</button>
  </>
  )
}

export default Login;