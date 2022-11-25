import React, {useEffect} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {useDispatch} from "react-redux";
import {postUser} from "../../redux/action"

function Login() {
  const dispatch = useDispatch();
  const {loginWithRedirect, logout, user} = useAuth0()
  useEffect(() => {
    if(user){
    dispatch(postUser({"name" : user.name, "email" : user.email, "email_verified" : user.email_verified}))
  }
  }, [])
  


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