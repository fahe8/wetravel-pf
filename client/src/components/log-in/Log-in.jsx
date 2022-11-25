import React from 'react';
import {useAuth0} from "@auth0/auth0-react"
import Profile from '../profile/profile';


function Login() {
  
  const {loginWithRedirect, logout, user} = useAuth0()
  console.log(user)
  return (<>
    {
      user ?
      <>
        <img src={user.picture} alt={user.name}/>
        <button className='w-[100px] h-[50px] border border-black mx-auto bg-[#00B4FF]' onClick={() => logout({ returnTo: window.location.origin })}>Log-out</button>
      </>
        
      :(<button className="w-[100px] h-[50px] border border-black mx-auto bg-[#00B4FF] " onClick={() => loginWithRedirect() }>Log-in</button>)
  
  }</>
  )
}

export default Login;