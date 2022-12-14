import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/action";
import { useAuth0 } from "@auth0/auth0-react";
import "./dashboard.css"

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
    <div className="background">
      <div className="text-center ">
        <div className=" text-4xl mt-8 font-medium">
          <h1>SuperAdmin</h1>
        </div>

        <hr />
        <div className="text-2xl font-medium">
          <ul>
            <div className="  p-3  hover:bg-sky-300">
              <li>
                <Link to={"/"}>
                  <h1>Landing Pages</h1>
                </Link>
              </li>
            </div>
            <hr />
            <div className=" p-2  hover:bg-sky-300">
              <li>
                {user && userDb.status !== "admin" ? (
                  <Link to={"/access-denied"}>
                    <h1>Usuarios Registrados</h1>
                  </Link>
                ) : (
                  <Link to={"/admin-users"}>
                    <h1>Usuarios Registrados</h1>
                  </Link>
                )}
              </li>
            </div>
            <hr />
            <div className=" p-2  hover:bg-sky-300 ">
              <li>
                {user && userDb.status !== "admin" ? (
                  <Link to={"/access-denied"}>
                    <h1>Control de comentarios</h1>
                  </Link>
                ) : (
                  <Link to={"/admin-reviews"}>
                    <h1>Control de comentarios</h1>
                  </Link>
                )}
              </li>
            </div>
            <hr />

            <div className=" p-2  hover:bg-sky-300">
              <li>
                {user && userDb.status !== "admin" ? (
                  <Link to={"/access-denied"}>
                    <h1>Control de Hoteles</h1>
                  </Link>
                ) : (
                  <Link to={"/admin-cards"}>
                    <h1>Control de Hoteles</h1>
                  </Link>
                )}
              </li>
            </div>
            <hr />

            <div className=" p-2  hover:bg-sky-300">
              <li>
                {user && userDb.status !== "admin" ? (
                  <Link to={"/access-denied"}>
                    <h1>Control de Images</h1>
                  </Link>
                ) : (
                  <Link to={"/admin-images"}>
                    <h1>Control de Images</h1>
                  </Link>
                )}
              </li>
            </div>
            <hr />

            <div className=" p-2  hover:bg-sky-300">
              <li>
                <Link to={"/home"}>
                  <button>Regresar a Home</button>
                </Link>
              </li>
            </div>
            <hr />
            <div className=" p-3 m-1  ">
              <li>
                <Link to={"/login"}>
                  <button className="bg-red-400 w-30 p-2 rounded  focus:rounded text-xl">
                    Cerrar Sesión
                  </button>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
