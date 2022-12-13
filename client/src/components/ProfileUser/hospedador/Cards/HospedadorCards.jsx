import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../../redux/action";
import HospedadorCard from "./HospedadorCard";
import { useAuth0 } from "@auth0/auth0-react";

const HospedadorCards = () => {
  let estadoUser = useSelector((state) => state.userId);
  const dispatch = useDispatch();
  const { user } = useAuth0();

  useEffect(() => {
    dispatch(getUserById(user?.email));
  }, [dispatch, user]);

  // console.log(estadoUser);
  return (
    <div className=' h-full md:h-screen w-full'>
      <div className='container mx-auto px-0 md:px-4 py-4'>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4'>
      {estadoUser?.hotels ? (
        estadoUser?.hotels?.map((hotel) =>
          <HospedadorCard hotel={hotel} />)
      ) : (
        <h1>No hay hoteles</h1>
      )}
        </div>
        </div>
      </div>
  );
};

export default HospedadorCards;
