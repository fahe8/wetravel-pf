import React from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // admin
  // user

  const login = () => {
    useLocalStorage('user', JSON.stringify({
      role: 'host'
    }));
    navigate('/anfitrion');
  }

  return (
    <div></div>
  )
}