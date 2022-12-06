import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { useLocalStorage } from "../../localStorage/useLocalStorage";

const useAuth = () => {
  const userAnfitrion = useLocalStorage('user', 'host');

  if (userAnfitrion) {
    return
  } else {
    return
  }
}

export const PublicRoutes = () => {
  const auth = useAuth();
  return auth ? <Navigate to='/anfitrion' /> : <Outlet/>
}