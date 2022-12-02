import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/action";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const { loginWithRedirect, logout, user } = useAuth0();
  const [userCondition, setUserCondition] = useState();

  function handleGuest(e) {
    e.preventDefault();
    setUserCondition("guest");
  }
  function handleHost(e) {
    e.preventDefault();
    setUserCondition("host");
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
    <>
      {user ? (
        <>
          <div className="rounded content-center">
            <img className="rounded" src={user.picture} alt={user.name} />
            <Link to={"/createhotel"}>
              <button
                className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
                onChange={(e) => handleGuest(e)}
              >
                Ser Huesped
              </button>
            </Link>
            <button
              className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
              onClick={handleHost}
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
    </>
  );
}

export default Login;
