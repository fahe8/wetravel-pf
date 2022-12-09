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

  console.log(estadoUser);
  return (
    <div>
      {estadoUser?.hotels ? (
        estadoUser?.hotels?.map((hotel) => <HospedadorCard hotel={hotel} />)
      ) : (
        <p>No hay hoteles</p>
      )}
    </div>
  );
};

export default HospedadorCards;
