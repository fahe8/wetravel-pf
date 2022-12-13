import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baned, getUser } from "../../redux/action";
import Sidebar from "./sidebar";
import Navbar from "../navBar/NavBar";
import { useAuth0 } from "@auth0/auth0-react";

export const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);
  const { user } = useAuth0();
  // console.log(user);
  const banear = (id, payload) => {
    baned(id, payload);
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="min-h-screen grid grid-cols-6 ">
      <Sidebar />
      <div className="xl:col-span-5  ">
        <Navbar />
        <div className="xl:col-span-5 p-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 nb-10">
          <div className="flex items-center justify-between bg-red-100 p-8 rounded-xl">
            <div>
              <h3 className="uppercase font-bold">Usuarios</h3>
              <br />
              {users
                ? users.map((el) => {
                    return (
                    <>
                    { el.baned === true ?
                    (   
                      <>
                        <p>{el.name}</p>
                        <button onClick={() => {dispatch(baned({ baned:false }, el.id))}}>Desbanear usuario</button>
                      </>
                    ) :
                    <>
                      <img src={user.picture} alt="imagen not found"/>
                      <p>{el.name}</p>
                      <button onClick={() => {dispatch(baned({ baned: true }, el.id))}}>Banear usuario</button>
                    </>
                    }
                    </>      
                     
                    );
                  })
                : "esta vacio"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};





                        // <div>
                        // {el.baned === false?
                        //   (<>
                        // <img src={user.picture} alt="img not found" />
                        // <p>{el.name}</p>
                        // <button
                        //   onClick={() => {
                        //     dispatch(baned({ baned: true }, el.id));
                        //   }}
                        // >
                        //   <strong>Eliminar usuario</strong>
                        // </button>
                        //  </>):
                        //   (<>
                        //   <img src={user.picture} alt="img not found" />
                        //   <p>{el.name}</p>
                        //   <button
                        //   onClick={() => {
                        //     dispatch(baned({ baned: false }, el.id));
                        //   }}
                        // >
                        //   <strong>Desbanear usuario</strong>
                        // </button>
                        //   </>)
                        // }}
                        // <div/>