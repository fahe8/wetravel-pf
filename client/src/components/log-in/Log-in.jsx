import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/action";
import { useHistory } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const [userCondition, setUserCondition] = useState("guest");
console.log(useAuth0())
  function handleGuest(e) {
    e.preventDefault();
    setUserCondition("guest");

  }
  function handleHost(e) {
    e.preventDefault();
    setUserCondition("host");

  }

  console.log(isAuthenticated);
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
              onClick={(e) => handleGuest(e)}
            >
              Ser Huesped
            </button>
            <button
              className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
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
