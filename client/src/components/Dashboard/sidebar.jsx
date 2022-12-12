import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/action";

// import { BsFillCalendarDateFill } from "react-icons/";
import { IconButton } from "@mui/material";
// import { CalendarMonth } from "@mui/material";
import {
  RiCalendarTodoLine,
  RiLogoutCircleRLine,
  RiArrowRightSLine,
  RiEarthLine,
  RiHome4Fill,
} from "react-icons/ri";
import { shadows } from "@mui/system";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocalStorage } from "../../localStorage/useLocalStorage";

const Sidebar = () => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const userDb = useSelector((state) => state.userId);

  useEffect(() => {
    if (user) {
      dispatch(getUserById(user.email));
    }
  }, [dispatch, user]);

  return (
    <div className="xl:h-[100vh] overFlow-y-scroll fixed xl:static w-full h-full -left-full top-0 bg-secondary-100 p-4 flex flex-col justify-between ">
      <div className="text-center text-2xl font-bold text-white">
        <h1>Administrador</h1>

        <ul className="mt-4">
          <li>
            <Link
              to={""}
              className="bg-Dark grayish blue flex items-center gap-4 py-2 px-4 roudend-lg hover:bg-white.900"
            >
              <RiHome4Fill>Inicio</RiHome4Fill>
            </Link>
          </li>
          <li>
            {user && userDb.status !== "admin" ? (
              <Link
                to={"/access-denied"}
                className="py-2 px-4 ml-1 border-l border-gray-500 ml-6 block"
              >
                <h1>Reviews</h1>
              </Link>
            ) : (
              <Link
                to={"/admin-reviews"}
                className="py-2 px-4 ml-1 border-l border-gray-500 ml-6 block"
              >
                <h1>Reviews</h1>
              </Link>
            )}
          </li>
          <li>
            {user && userDb.status !== "admin" ? (
              <Link
                to={"/access-denied"}
                className="py-2 px-4 ml-1 border-l border-gray-500 ml-6 block"
              >
                <h1>Hoteles</h1>
              </Link>
            ) : (
              <Link
                to={"/admin-cards"}
                className="py-2 px-4 ml-1 border-l border-gray-500 ml-6 block"
              >
                <h1>Hoteles</h1>
              </Link>
            )}
          </li>
          <li>
            {user && userDb.status !== "admin" ? (
              <Link
                to={"/access-denied"}
                className="py-2 px-4 ml-1 border-l border-gray-500 ml-6 block"
              >
                <h1>Images</h1>
              </Link>
            ) : (
              <Link
                to={"/admin-images"}
                className="py-2 px-4 ml-1 border-l border-gray-500 ml-6 block"
              >
                <h1>Images</h1>
              </Link>
            )}
          </li>
        </ul>
        <li>
          <Link
            to={"/home"}
            className=" bg-Dark grayish blue flex items-center gap-4 py-2 px-4 roudend-lg hover:bg-white.900 text-black"
          >
            <h1>Regresar a Home</h1>
          </Link>
        </li>
        <li>
          <Link
            to={"/login"}
            className="bg-Dark grayish blue flex items-center gap-4 py-2 px-4 roudend-lg hover:bg-white.900 text-black"
          >
            <RiLogoutCircleRLine className="text-black flex flex-col justify-between ">
              Cerrar Seción
            </RiLogoutCircleRLine>
          </Link>
        </li>
      </div>
    </div>
  );
};
export default Sidebar;
