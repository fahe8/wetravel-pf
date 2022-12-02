import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/action";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loginWithRedirect, logout, user } = useAuth0();
  const [userCondition, setUserCondition] = useState("guest");

  function handleGuest(e) {
    e.preventDefault();
    setUserCondition("guest");
    history.push('/huesped');
  }
  function handleHost(e) {
    e.preventDefault();
    setUserCondition("host");
    history.push('/anfitrion');
  }

  useEffect(() => {
    if (user) {
      dispatch(
        postUser({
          name: user.name,
          email: user.email,
          email_verified: user.email_verified,
          status: userCondition,
        })
      );
    }
  }, [userCondition, dispatch]);

  return (
    <div>
      {user ? (
        <>
          <div className="rounded content-center">
            <img className="rounded" src={user.picture} alt={user.name} />
            <button
              className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
              // onChange={(e) => handleGuest(e)}
              onClick={(e) => handleGuest(e)}
            >
              Ser Huesped
            </button>
            <button
              className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
              // onChange={(e) => handleHost(e)}
              onClick={(e) => handleHost(e)}
            >
              Ser Hospedador
            </button>
            <button
              className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log-out
            </button>
          </div>
        </>
      ) : (
        <button
          className="w-[100px] h-[40px] border border-black mx-auto bg-[#00B4FF] rounded"
          onClick={() => loginWithRedirect()}
        >
          Log-in
        </button>
      )}
      <br />
      <div>
        <div>
          <p>{user.name}</p>
        </div>
        <br />
        <div>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
