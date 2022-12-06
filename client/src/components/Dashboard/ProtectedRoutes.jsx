import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const userAnfitrion = useLocalStorage("user", "host");

  if (userAnfitrion) {
    return {
      auth: true,
      role: userAnfitrion.role,
    };
  } else {
    return {
      auth: false,
      role: null,
    };
  }
};

export const ProtectedRoutes = ({ userAnfitrion }) => {
  const { auth, role } = useAuth();

  if (userAnfitrion) {
    return auth ? (
      userAnfitrion === role ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )
    ) : (
      <Navigate to="/login" />
    );
  } else {
    return auth ? <Outlet /> : <Navigate to="/login" />
  }
};
